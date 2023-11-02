import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss'],
})
export class MusicPlayerComponent {
  @ViewChild('music') music?: ElementRef;

  problemTitle: any;
  minutes: number = 0;
  seconds: number = 0;

  getMinutes: number = 0;
  getSeconds: number = 10;
  modelTitle: any;

  timer: any;
  isPlaying: boolean = false;
  audioLink: any = '../../../assets/music/music.mp3';

  c1StrokeDasharray: string = '100 0';
  c2StrokeDasharray: string = '0 100';
  c1StrokeDashoffset: string = '0';
  strokeLinecap: string = '';


  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      let problemType = params.get('problemTitle');
      let sessionType = params.get('sessionType');
      this.problemTitle = problemType;
      this.modelTitle = sessionType;
    });
  }

  closeSessionModal() {
    this.stopTimer();
    this.router.navigate(['tabs', 'dashboard','recommended-detail',this.problemTitle,]);
  }
  
  i = 1;
  totalDuration = this.getMinutes * 60 + this.getSeconds;
  startTimer() {
    this.music?.nativeElement.play();

    const c1 = document.getElementById('c1') as SVGCircleElement | null;
    const c2 = document.getElementById('c2') as SVGCircleElement | null;
    if (c1 && c2) {
      c1.classList.remove('no-transition');
      c2.classList.remove('no-transition');
      this.timer = setInterval(() => {
        // Timer logic
        const elapsedSeconds = this.minutes * 60 + this.seconds;
        console.log(`Elapsed Seconds: ${elapsedSeconds}`);

        if (
          elapsedSeconds === this.totalDuration ||
          this.i > this.totalDuration
        ) {
          // Timer completed, reset timer variables
          this.i = 1;
          this.minutes = 0;
          this.seconds = 0;
          this.stopTimer();

          // Reset SVG animation to initial values
          c1.style.strokeDasharray = '100 0';
          c2.style.strokeDasharray = '0 100';
          c1.style.strokeDashoffset = '0';
          c1.classList.add('no-transition');
          c2.classList.add('no-transition');
          this.strokeLinecap = '';
          console.log('Timer completed and reset.');
        } else {
          if (this.seconds === 59) {
            this.minutes++;
            this.seconds = 0;
          } else {
            this.strokeLinecap = 'round';
            this.seconds++;
          }

          // SVG animation logic
          const k = (this.i / this.totalDuration) * 100;
          const l = 100 - k;
          this.c1StrokeDasharray = `${l} ${k}`;
          this.c2StrokeDasharray = `${k} ${l}`;
          this.c1StrokeDashoffset = `${l}`;
          this.i++;
          console.log(`Timer running: ${this.minutes}:${this.seconds}`);
        }
      }, 1000);
    }
    this.isPlaying = true;
    console.log('Timer started.');
  }

  stopTimer() {
    this.music?.nativeElement.pause();

    clearInterval(this.timer);
    this.isPlaying = false;
  }

  formatTime(time: number) {
    return time < 10 ? `0${time}` : `${time}`;
  }
}
