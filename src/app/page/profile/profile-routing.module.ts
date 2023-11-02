import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
// import { SettingsComponent } from './settings/settings.component';
import { TotalMeditationComponent } from './total-meditation/total-meditation.component';
import { LongestSessionComponent } from './longest-session/longest-session.component';
import { ShowAchievementsComponent } from './show-achievements/show-achievements.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: 'total-meditation',
    component: TotalMeditationComponent,
  },
  {
    path: 'longest-session',
    component: LongestSessionComponent,
  },
  {
    path: 'show-achievements/:achievementsName',
    component: ShowAchievementsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
