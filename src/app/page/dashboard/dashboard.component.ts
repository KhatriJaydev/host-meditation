import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from '../tabs/tabs.component';
import { Router } from '@angular/router';
import { UrlConverterService } from 'src/app/services/url-converter.service';
import { fade } from 'src/app/animations/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [fade]
})
export class DashboardComponent {
  constructor(private router: Router, private urlConverterService: UrlConverterService) {}
  dashboardCarousel = [
    {
      title: 'Anxiety Problems',
      min: '20 min',
      backGroundColor: 'cardOne',
      backGroundImg: '.../../../../../assets/Problems/AnxietyProblems.svg',
    },
    {
      title: 'Sleep Better',
      min: '35 min',
      backGroundColor: 'cardTwo',
      backGroundImg: '.../../../../../assets/Problems/AnxietyProblems.svg',
    },
  ];
  openCategories(typeOFcategories: string) {
    if (typeOFcategories === 'jobStress') {
      this.router.navigate([ 'tabs','dashboard', 'job-strees']);
    }
  }

  showRecommendedDetail(RecommendedDetail: string) {
    for (const item of this.dashboardCarousel) {
      if (RecommendedDetail === item.title) {
        // const recommendedDetailUrl = this.urlConverterService.convertUrl(RecommendedDetail)
        this.router.navigate([ 'tabs', 'dashboard', 'recommended-detail', RecommendedDetail]);
      }
    }
  }
  openFilter() {
    this.router.navigate(['dashboard', 'filter']);
  }
}
