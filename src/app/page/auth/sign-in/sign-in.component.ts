import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnboardingService } from 'src/app/services/onboarding.service';
import { fadeInRightAndSlide } from 'src/app/animations/animations';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  animations: [fadeInRightAndSlide],
})
export class SignInComponent {
  showPassword = false;
  loginResponseData: any = '';
  userToken: any = ''; // token save when login
  constructor(
    public router: Router,
    private onboardingService: OnboardingService,
    public apiService: ApiService
  ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  signUP() {
    this.router.navigate(['/sign-up']);
  }

  forgotPassword() {
    this.router.navigate(['sign-in', 'forgot-password']);
  }
  goBack() {
    this.onboardingService.setOnboardingCompleted(false);
    this.router.navigate(['home']);
  }
  async userLogin() {
    (await this.apiService.loginUserAccount()).subscribe(
      (response) => {
        this.loginResponseData = response;
        this.userToken = this.loginResponseData.data;
        console.log('this.userToken', this.userToken);
        this.apiService.setUserToken(this.userToken);
        this.apiService.getUserInfo().subscribe((userInfo) => {
          this.apiService.handleUserInfoResponse(userInfo);
        });
        console.log(response);
        this.router.navigate(['tabs', 'dashboard']);
      },
      (error) => {
        console.log(error);
        if (
          error.error.message == 'Email is Invalid' &&
          error.error.statusCode == 404
        ) {
          this.apiService.loginFormModel
            .get('email')
            ?.setErrors({ invalidEmail: true });
        }

        if (
          error.error.message == 'Password is invalid' &&
          error.error.statusCode == 409
        ) {
          this.apiService.loginFormModel
            .get('password')
            ?.setErrors({ invalidPassword: true });
        }
      }
    );
  }
}
