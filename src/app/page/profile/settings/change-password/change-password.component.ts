import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from 'src/app/page/auth/sign-in/forgot-password/confirm-password.validator';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  isPopUpOpen: boolean = false;
  showPassword: boolean = false;
  showConfirmPass: boolean = false;
  showNewPass: boolean = false;
  submittedForgotPass: boolean = false;
  currentConfirmPasswordForm: FormGroup;
  oldPassword: FormGroup;
  changePasswordString = '';

  password: string;

  oldPasswordModel: boolean = true;
  createPasswordModel: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.password = 'password';

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
    this.oldPassword = this.formBuilder.group({
      oldPasswordInput: ['', Validators.required],
    });
  }

  togglePasswordVisibility(password: string) {
    if (password === 'currentPassword') {
      this.showPassword = !this.showPassword;
    } else if (password === 'newPassword') {
      this.showNewPass = !this.showNewPass;
    } else if (password === 'confirmPassword') {
      this.showConfirmPass = !this.showConfirmPass;
    }
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  checkOldPassword() {
    const oldPassword = this.oldPassword.get('oldPasswordInput')?.value; // Set your old password here
    this.apiService.verifyChangePassword(oldPassword).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.changePasswordString = response.data;
          this.createPasswordModel = true;
          this.oldPasswordModel = false;
          console.log(response);
        }
      },
      (error) => {
        console.error(error);
        this.oldPassword.get('oldPasswordInput')?.setErrors({ invalid: true });
      }
    );
  }

  updatePassword() {
    this.onSubmit();
    this.apiService
      .changePassword(
        this.changePasswordString,
        this.currentConfirmPasswordForm.get('password')?.value,
        this.currentConfirmPasswordForm.get('confirmPassword')?.value
      )
      .subscribe((response) => {
        if (this.currentConfirmPasswordForm.valid) {
          console.log(response);
          this.isPopUpOpen = true;
        }
      });
  }

  goBack() {
    this.router.navigate(['tabs', 'profile', 'settings']);
  }

  newPassword() {
    if (this.currentConfirmPasswordForm.valid) {
      this.isPopUpOpen = true;
    }
  }

  onSubmit() {
    this.submittedForgotPass = true;
  }

  closePopup() {
    this.router.navigate(['tabs', 'profile', 'settings']);
    this.isPopUpOpen = false;
  }
}
