import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { TotalMeditationComponent } from './total-meditation/total-meditation.component';
import { LongestSessionComponent } from './longest-session/longest-session.component';
import { TabsComponent } from '../tabs/tabs.component';
import { ShowAchievementsComponent } from './show-achievements/show-achievements.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProfileComponent,
    TotalMeditationComponent,
    LongestSessionComponent,
    ShowAchievementsComponent,
  ],
  imports: [CommonModule, ProfileRoutingModule, FormsModule],
})
export class ProfileModule {}
