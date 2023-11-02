import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-longest-session',
  templateUrl: './longest-session.component.html',
  styleUrls: ['./longest-session.component.scss'],
})
export class LongestSessionComponent {
  longestSession = [
    {
      minutes: '35 minutes',
      content: 'Your longest meditation session so far since you have started.',
    },
    {
      minutes: '35 minutes',
      content: 'Your second longest meditation session so far.',
    },
    {
      minutes: '27 minutes',
      content: 'Your third longest meditation session so far.',
    },
  ];
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['tabs', 'profile']);
  }
}
