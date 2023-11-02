import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInPageRoutingModule } from './sign-in-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [SignInComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    SignInPageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class SignInModule {}
