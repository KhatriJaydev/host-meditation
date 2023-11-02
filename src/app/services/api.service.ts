import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { getMessaging, getToken } from 'firebase/messaging';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl?: string;
  userToken: string = '';

  setUserToken(token: string) {
    localStorage.setItem('token', token);
    // this.userToken = token;
  }

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) {
    this.baseUrl = environment.baseURL;
  }
  async requestPermission(): Promise<string | 'undefined'> {
    const messaging = getMessaging();
    try {
      const currentToken = await getToken(messaging, {
        vapidKey: environment.firebase.vpaidKey,
      });
      if (currentToken) {
        console.log(currentToken);
        this.loginFormModel.patchValue({
          deviceToken: currentToken,
        });
        return currentToken;
      } else {
        console.log('Token is undefined');
        return 'undefined';
      }
    } catch (error) {
      console.error('Error getting token:', error);
      return 'undefined';
    }
  }

  signUpFormModel = this.formBuilder.group({
    firstName: [
      'John',
      [Validators.required, Validators.pattern('[a-zA-Z ]*')],
    ],
    lastName: [
      'Smith',
      [Validators.required, Validators.pattern('[a-zA-Z ]*')],
    ],
    email: [
      'johnsmith@gmail.com',
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    password: ['Qwer@16', Validators.required],
    deviceToken: ['deviceToken', Validators.required],
  });

  createUser(formData: FormData): Observable<any> {
    const url = `${this.baseUrl}/user/signUp`;
    const headers = new HttpHeaders();
    return this.httpClient.post(url, formData, { headers });
  }

  createUserAccount() {
    const signUpdata = new FormData();
    signUpdata.append(
      'firstName',
      this.signUpFormModel.get('firstName')?.value || ''
    );
    signUpdata.append(
      'lastName',
      this.signUpFormModel.get('lastName')?.value || ''
    );
    signUpdata.append('email', this.signUpFormModel.get('email')?.value || '');
    signUpdata.append(
      'password',
      this.signUpFormModel.get('password')?.value || ''
    );
    signUpdata.append(
      'deviceToken',
      this.signUpFormModel.get('deviceToken')?.value || ''
    );

    return this.createUser(signUpdata);
  }

  profileUpdate = this.formBuilder.group({
    firstName: ['', [Validators.pattern('[a-zA-Z ]*')]],
    lastName: ['', [Validators.pattern('[a-zA-Z ]*')]],
    email: [
      '',
      [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
    ],
    file: '',
  });

  profileUpdateForm() {
    const updateProfile = new FormData();
    updateProfile.append(
      'firstName',
      this.profileUpdate.get('firstName')?.value || ''
    );
    updateProfile.append(
      'lastName',
      this.profileUpdate.get('lastName')?.value || ''
    );
    updateProfile.append('email', this.profileUpdate.get('email')?.value || '');
    const file = this.profileUpdate.get('file')?.value;
    if (file) {
      updateProfile.append('image', file);
    }
    return this.updateUserData(updateProfile);
  }

  updateUserData(formData: FormData): Observable<any> {
    const url = `${this.baseUrl}/user/update`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.httpClient.patch(url, formData, { headers });
  }

  loginFormModel = this.formBuilder.group({
    email: [
      'johnsmith@gmail.com',
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    password: ['John@1', [Validators.required]],
    deviceToken: '',
  });

  loginUser(loginUser: any): Observable<any> {
    const url = `${this.baseUrl}/auth/login`;
    return this.httpClient.post(url, loginUser);
  }

  async loginUserAccount() {
    const currentToken = await this.requestPermission();

    const loginData = {
      email: this.loginFormModel.get('email')?.value || '',
      password: this.loginFormModel.get('password')?.value || '',
      deviceToken: currentToken || '',
    };

    return this.loginUser(loginData);
  }

  getUserInfo(): Observable<any> {
    const url = `${this.baseUrl}/user/userInfo`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.httpClient.get(url, { headers });
  }

  handleUserInfoResponse(userInfo: any) {
    console.log('User Info:', userInfo);

    this.profileUpdate.patchValue({
      firstName: userInfo?.data?.firstName || '',
      lastName: userInfo?.data?.lastName || '',
      email: userInfo?.data?.email || '',
      file: userInfo?.data?.image || '',
    });
  }

  verifyChangePassword(oldPassword: string): Observable<any> {
    const url = `${this.baseUrl}/user/verifyChangePassword`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    const body = {
      oldPassword: oldPassword,
    };

    return this.httpClient.patch(url, body, { headers });
  }
  changePassword(
    changePasswordString: string,
    newPassword: any,
    confirmPassword: any
  ) {
    const url = `${this.baseUrl}/user/changePassword`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    const body = {
      changePasswordString: changePasswordString,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };

    return this.httpClient.patch(url, body, { headers });
  }
  emailVerify(userEmail: string): Observable<any> {
    const url = `${this.baseUrl}/user/forgotPassword`;
    const body = {
      email: userEmail,
    };
    return this.httpClient.post(url, body);
  }

  otpEmailVerify(userEmail: any, userOtp: any): Observable<any> {
    const url = `${this.baseUrl}/user/verifyOtp`;
    const body = {
      email: userEmail,
      otp: userOtp,
    };
    return this.httpClient.post(url, body);
  }

  userResetPassword(
    userEmail: any,
    userOtpString: any,
    userNewPassword: any,
    userConfirmPassword: any
  ) {
    const url = `${this.baseUrl}/user/resetPassword`;
    const body = {
      email: userEmail,
      otpString: userOtpString,
      newPassword: userNewPassword,
      confirmPassword: userConfirmPassword,
    };
    return this.httpClient.post(url, body);
  }
  getUserNotificationStatus(): Observable<any> {
    const url = `${this.baseUrl}/notifications/getUserNotifications`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.httpClient.get(url, { headers });
  }

  updateNotification(idNotification: any, notificationStatus: any): Observable<any>{
    const url = `${this.baseUrl}/notifications/userNotificationsEnableDisable/${idNotification}?isSubscribed=${notificationStatus}`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    const body = {
      id: idNotification,
      isSubscribed: notificationStatus,
    };
    return this.httpClient.post(url, body, { headers });
  }
  getUserPreferencesStatus(): Observable<any> {
    const url = `${this.baseUrl}/preferences/getUserPreferences`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.httpClient.get(url, { headers });
  }
  updatePreferences(idPreference: any, preferenceStatus: any): Observable<any> {
    const url = `${this.baseUrl}/preferences/userPreferencesEnableDisable/${idPreference}?flag=${preferenceStatus}`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    const body = {
      id: idPreference,
      isSubscribed: preferenceStatus,
    };
    return this.httpClient.post(url, body, { headers });
  }
  async validateToken(): Promise<any> {
    const url = `${this.baseUrl}/auth/validate-token`;
    const oldToken = localStorage.getItem('token');
    const currentToken = await this.requestPermission();

    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    const body = {
      token: oldToken,
      deviceToken: currentToken || '',
    };

    return this.httpClient.post(url, body, { headers });
  }
}
