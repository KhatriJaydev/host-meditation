import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { fade } from 'src/app/animations/animations';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [fade],
})
export class ProfileComponent {
  achievementsList = ['Stress Decrease', 'Focus Master', 'Consistent Schedule'];

  isAchievementAvailable = true;
  imageUrl = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  profileImage = '';
  constructor(private router: Router, private apiService: ApiService) {}

  goToSettings() {
    this.router.navigate(['tabs', 'profile', 'settings']);
  }

  showProgress(progress: string) {
    if (progress === 'totalMeditation') {
      this.router.navigate(['profile', 'total-meditation']);
    } else if (progress === 'longestSession') {
      this.router.navigate(['profile', 'longest-session']);
    }
  }

  showAchievements(achievementsName: string) {
    this.router.navigate(['profile', 'show-achievements', achievementsName]);
  }
  getUserInformation() {
    this.apiService.getUserInfo().subscribe((userInfo: any) => {
      this.firstName = userInfo?.data?.firstName;
      this.lastName = userInfo?.data?.lastName;
      this.email = userInfo?.data?.email;
      this.profileImage = userInfo?.data?.image;
    });
  }

  ngOnInit() {
    this.getUserInformation();
    this.imageUrl = environment.baseURL;
  }
}
