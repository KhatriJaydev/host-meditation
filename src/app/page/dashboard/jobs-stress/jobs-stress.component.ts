import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs-stress',
  templateUrl: './jobs-stress.component.html',
  styleUrls: ['./jobs-stress.component.scss'],
})
export class JobsStressComponent {
  constructor(private router: Router) {}
  goBack() {
    this.router.navigate(['tabs/dashboard']);
  }
}
