import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { fadeIn } from 'src/app/animations/animations';
import { ApiService } from 'src/app/services/api.service';
import { OnboardingService } from 'src/app/services/onboarding.service';

@Component({
  selector: 'app-launch-screen',
  templateUrl: './launch-screen.component.html',
  styleUrls: ['./launch-screen.component.scss'],
  animations: [fadeIn],
})
export class LaunchScreenComponent {
  firstScreen: boolean = true;
  secondScreen: boolean = false;
  thirdScreen: boolean = false;
  fourthScreen: boolean = false;
  fifthScreen: boolean = false;
  constructor(
    private router: Router,
    private onboardingService: OnboardingService,
    private apiService: ApiService
  ) {
    // setTimeout(() => {
    //   this.firstScreen = false;
    //   this.secondScreen = true;
    // }, 3000);
  }

  skipScreen() {
    this.secondScreen = false;
    this.fifthScreen = true;
  }

  goToBackScreen() {
    if (this.fifthScreen) {
      this.fifthScreen = false;
      this.fourthScreen = true;
    } else if (this.fourthScreen) {
      this.fourthScreen = false;
      this.thirdScreen = true;
    } else if (this.thirdScreen) {
      this.thirdScreen = false;
      this.secondScreen = true;
    } else if (this.secondScreen) {
      this.secondScreen = false;
      this.firstScreen = true;
    }
  }
  goToNextScreen() {
    if (this.firstScreen) {
      this.firstScreen = false;
      this.secondScreen = true;
    } else if (this.secondScreen) {
      this.secondScreen = false;
      this.thirdScreen = true;
    } else if (this.thirdScreen) {
      this.thirdScreen = false;
      this.fourthScreen = true;
    } else if (this.fourthScreen) {
      this.fourthScreen = false;
      this.fifthScreen = true;
    }
  }
  signIn() {
    this.router.navigate(['sign-in']);
  }

  signUp() {
    this.router.navigate(['sign-up']);
  }
  async checkToken() {
    (await this.apiService.validateToken()).subscribe(
      (response: any) => {
        console.log('User is already logged in', response);
        this.router.navigate(['tabs', 'dashboard']);
      },
      (error: any) => {
        this.router.navigate(['sign-in']);
      }
    );
  }
  ngOnInit() {
    if (this.onboardingService.onboardingCompleted) {
      setTimeout(() => {
        this.firstScreen = false;
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          this.checkToken();
        } else {
          this.fifthScreen = true;
        }
      }, 3000);
    } else {
      this.firstScreen = true;
      setTimeout(() => {
        this.firstScreen = false;
        this.secondScreen = true;
        this.onboardingService.setOnboardingCompleted(true);
      }, 3000);
    }
  }
}
