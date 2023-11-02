import { UrlConverterService } from './../../../services/url-converter.service';
import { Component,OnInit,  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recommended-detail',
  templateUrl: './recommended-detail.component.html',
  styleUrls: ['./recommended-detail.component.scss'],
})
export class RecommendedDetailComponent implements OnInit {
  problemTitle: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private urlConverterService: UrlConverterService
  ) {
    this.route.paramMap.subscribe((params) => {
      let problemType = params.get('problemType');
      this.problemTitle = problemType;
    });
  }

  sessionsList = [
    {
      icon: '../../../assets/icons/playIcon.svg',
      sessionType: 'Sleep Better',
      sessionMin: '2 min / 5 min',
    },
    {
      icon: '../../../assets/icons/clockIcon.svg',
      sessionType: 'Bad Dreams',
      sessionMin: '0 min / 10 min',
    },
    {
      icon: '../../../assets/icons/clockIcon.svg',
      sessionType: 'Panic Attacks',
      sessionMin: '0 min / 5 min',
    },
    {
      icon: '../../../assets/icons/clockIcon.svg',
      sessionType: 'Phone Addiction',
      sessionMin: '0 min / 15 min',
    },
    {
      icon: '../../../assets/icons/clockIcon.svg',
      sessionType: 'Overthinking',
      sessionMin: '0 min / 5 min',
    },
  ];

  openSessionModal(selectedItem: any) {
    // const sessionType = this.urlConverterService.convertUrl(selectedItem.sessionType);
    this.router.navigate([
      'recommended-detail',
      this.problemTitle,
      selectedItem.sessionType,
    ]);

    // this.modelTitle = selectedItem.sessionType;
    // this.stopTimer();
    // this.i = 1;
    // this.minutes = 0;
    // this.seconds = 0;
    // this.c1StrokeDasharray = '100 0';
    // this.c2StrokeDasharray = '0 100';
    // this.c1StrokeDashoffset = '0';
    // this.isSessionModalOpen = true;
    // document.body.style.overflow = 'hidden';
    // this.strokeLinecap = '';
    // console.log('Selected Item:', selectedItem);
    // console.log(this.music?.nativeElement.duration);
  }

  goBack() {
    this.router.navigate(['tabs/dashboard']);
  }

  ngOnInit() {}
}
