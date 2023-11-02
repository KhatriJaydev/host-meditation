import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { single } from './total-meditation-data';

@Component({
  selector: 'app-total-meditation',
  templateUrl: './total-meditation.component.html',
  styleUrls: ['./total-meditation.component.scss'],
})
export class TotalMeditationComponent {
  // single: any = single;
  // multi: [] = [];

  constructor(private router: Router) {}
  graphBars = [
    { height: 50, label: 'M' },
    { height: 70, label: 'T' },
    { height: 30, label: 'W' },
    { height: 40, label: 'T' },
    { height: 60, label: 'F' },
    { height: 80, label: 'S' },
    { height: 90, label: 'S' },
  ];
  // view: [number, number] = [345, 197];
  // // options
  // showXAxis = true;
  // showYAxis = false;
  // gradient = false;
  // showLegend = false;
  // animation =  false;
  // showXAxisLabel = false;
  // xAxisLabel = 'Day';
  // showYAxisLabel = false;
  // colorScheme: any = {
  //   domain: ['#3A3B3B'],
  // };
  // barPaddingValue = 30;

  goBack() {
    this.router.navigate(['tabs', 'profile']);
  }
}
