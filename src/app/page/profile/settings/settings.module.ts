import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LogoutComponent } from './logout/logout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SettingsComponent,
    PersonalDetailsComponent,
    ChangePasswordComponent,
    PreferencesComponent,
    NotificationsComponent,
    PrivacyPolicyComponent,
    ContactUsComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    FormsModule
    
  ]
})
export class SettingsModule { }
