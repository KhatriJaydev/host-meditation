import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  @ViewChild('Input4') input4: ElementRef | undefined;

  forgotPasswordForm: FormGroup;
  otpForm: FormGroup;
  currentConfirmPasswordForm: FormGroup;

  submittedForgotPass: boolean = false;

  forgotPassModel = true; //true
  emailVerificationModel = false;
  resetPasswordModel = false; //false

  isPopUpOpen: boolean = false;

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  userOtpString: any = '';
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: [
        'johnsmith@gmail.com',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    });

    this.otpForm = this.formBuilder.group({
      otpInput1: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      otpInput2: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      otpInput3: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      otpInput4: ['', [Validators.required, Validators.pattern(/^\d$/)]],
    });

    this.currentConfirmPasswordForm = this.formBuilder.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6), // Minimum length requirement
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: ConfirmPasswordValidator('password', 'confirmPassword'), // Confirm password validator
      }
    );
  }

  goBack() {
    this.router.navigate(['sign-in']);
  }

  ngOnInit(): void {}

  emailVerify() {
    this.apiService
      .emailVerify(this.forgotPasswordForm.get('email')?.value)
      .subscribe(
        (response: any) => {
          console.log('response', response);
          if (this.forgotPasswordForm.valid) {
            this.emailVerificationModel = true;
            this.forgotPassModel = false;
            this.resetPasswordModel = false;
          }
        },
        (error) => {
          console.log(error);

          if (
            error.error.message == 'User not found' &&
            error.error.statusCode == 404
          ) {
            this.forgotPasswordForm
              .get('email')
              ?.setErrors({ invalidEmail: true });
          }
        }
      );
  }

  verifyOtp() {
    if (this.otpForm.valid) {
      const userOtp = `${this.otpForm.get('otpInput1')?.value}${
        this.otpForm.get('otpInput2')?.value
      }${this.otpForm.get('otpInput3')?.value}${
        this.otpForm.get('otpInput4')?.value
      }`;

      this.apiService
        .otpEmailVerify(this.forgotPasswordForm.get('email')?.value, userOtp)
        .subscribe(
          (response: any) => {
            this.userOtpString = response.data;
            this.resetPasswordModel = true;
            this.emailVerificationModel = false;
            this.forgotPassModel = false;
            console.log(response);
          },
          (error) => {
            if (
              error.error.message === 'Otp is Invalid or expired' &&
              error.error.data === 401
            ) {
              
              console.log('error', error);
            }
          }
        );
    }
  }

  newPassword() {
    this.onSubmit();
    if (this.currentConfirmPasswordForm.valid) {
      console.log(this.currentConfirmPasswordForm.value);

      const userEmail = this.forgotPasswordForm.get('email')?.value;
      const userOtpString = this.userOtpString;
      const userPassword =
        this.currentConfirmPasswordForm.get('password')?.value;
      const userConfirmPassword =
        this.currentConfirmPasswordForm.get('confirmPassword')?.value;
      this.apiService
        .userResetPassword(
          userEmail,
          userOtpString,
          userPassword,
          userConfirmPassword
        )
        .subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
      this.isPopUpOpen = true;
    }
  }

  onSubmit() {
    this.submittedForgotPass = true;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  closePopup() {
    this.router.navigate(['sign-in'])
    this.isPopUpOpen = false;
  }

  goToForgotPassword() {
    this.resetPasswordModel = false;
    this.emailVerificationModel = false;
    this.forgotPassModel = true;
  }

  goToemailVerification() {
    this.emailVerificationModel = true;
    this.forgotPassModel = false;
    this.resetPasswordModel = false;
  }

  showHidepass(passwordType: string) {
    if (passwordType === 'password') {
      this.showPassword = !this.showPassword;
    } else if (passwordType === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
  move(event: any, previous: any, current: any, next: any) {
    console.log(event);

    var length = current.value.length;
    var maxlength = +current.getAttribute('maxlength'); // Convert to number

    if (length === maxlength) {
      if (next !== '') {
        next.focus();
      }
    }

    if (event.key === 'Backspace') {
      if (previous !== '') {
        previous.focus();
      }
    }

    if (current === this.input4?.nativeElement && length === maxlength) {
      this.input4?.nativeElement.blur();
    }
  }

  // submitOtpForm() {
  //   if (this.otpForm.valid) {
  //     const otp =
  //       this.otpForm.value.otpInput1 +
  //       this.otpForm.value.otpInput2 +
  //       this.otpForm.value.otpInput3 +
  //       this.otpForm.value.otpInput4;
  //     console.log('Submitted OTP:', otp);
  //   } else {
  //     // OTP form is not valid, display error messages if needed
  //   }
  // }
  // submitForgotPasswordForm() {
  //   if (this.forgotPasswordForm.valid) {
  //     const email = this.forgotPasswordForm.value.email;
  //     console.log('Submitted email:', email);
  //   } else {
  //     // Display error messages or handle invalid form data
  //   }
  // }
}
