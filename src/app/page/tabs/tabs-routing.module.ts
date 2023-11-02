import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './tabs.component';

const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren:()=> import('../dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'explore',
        loadChildren:()=> import('../explore/explore.module').then((m) => m.ExploreModule)
      },
      {
        path: 'profile',
        loadChildren:()=> import('../profile/profile.module').then((m) => m.ProfileModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsRoutingModule {}
