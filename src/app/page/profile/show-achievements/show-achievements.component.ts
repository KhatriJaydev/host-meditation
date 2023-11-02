import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-achievements',
  templateUrl: './show-achievements.component.html',
  styleUrls: ['./show-achievements.component.scss'],
})
export class ShowAchievementsComponent {
  selectedAchievement: string = '';
  achievementDetails = [
    {
      title: 'Stress Decrease',
      span: 'Your stress level has decreased in the past 5 days.',
    },
    {
      title: 'Focus Master',
      span: 'You have been really focused for the past 30 days.',
    },
    {
      title: 'Consistent Schedule',
      span: 'You have been consistent for the past 10 days.',
    },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  shareAchievement(selectedAchievement: string) {
    console.log('Shared Achievement:', selectedAchievement);
  }
  goBack() {
    this.router.navigate(['tabs', 'profile']);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const achievementsName = params['achievementsName'];
      this.selectedAchievement = achievementsName || '';
    });
  }
}
