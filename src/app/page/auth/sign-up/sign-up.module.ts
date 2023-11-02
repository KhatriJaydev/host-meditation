import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpPageRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SignUpComponent],
  imports: [CommonModule, SignUpPageRoutingModule, ReactiveFormsModule],
})
export class SignUpModule {}
