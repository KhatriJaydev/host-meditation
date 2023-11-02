import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { JobsStressComponent } from './jobs-stress/jobs-stress.component';
import { RecommendedDetailComponent } from './recommended-detail/recommended-detail.component';
import { FilterComponent } from './filter/filter.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'job-strees',
    component: JobsStressComponent,
  },
  {
    path: 'recommended-detail/:problemType',
    component: RecommendedDetailComponent,
  },
  {
    path: 'filter',
    component: FilterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
