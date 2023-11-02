import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OnboardingService {
  private onboardingCompletedKey = 'onboardingCompleted';
  onboardingCompleted: boolean;

  constructor() {
    const storedValue = localStorage.getItem(this.onboardingCompletedKey);
    this.onboardingCompleted = storedValue ? JSON.parse(storedValue) : false;
  }

  setOnboardingCompleted(completed: boolean) {
    this.onboardingCompleted = completed;
    localStorage.setItem(this.onboardingCompletedKey, JSON.stringify(completed));
  }
}
