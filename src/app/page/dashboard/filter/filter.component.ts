import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { fadeInRightAndSlide } from 'src/app/animations/animations';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  animations: [fadeInRightAndSlide],
})
export class FilterComponent implements OnInit, AfterViewInit {
  constructor(
    private router: Router,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private cdRef: ChangeDetectorRef
  ) {}
  isFilterOpen: boolean = false;
  filterTitle: String = '';

  selectedGoal: any;
  selectedDuration: any;

  startTimeValue = 5;
  endTimeValue = 25;

  isPopUpOpen: boolean = false;

  popUptitle: string = 'Clear All';
  popupText: string = 'Are you sure that you would like to clear all filters?';
  popupIcon: string = '../../../../assets/icons/clearAll.svg';
  poupButtonText: string = 'Confirm';

  filterList = [
    {
      icon: '../../../assets/icons/clockIcon.svg',
      filterName: 'Duration',
      selectedDuration: '',
    },
    {
      icon: '../../../assets/icons/GoalIcon.svg',
      filterName: 'Goal',
      selectedGoal: '',
    },
  ];
  goalList = [
    'Stress Decrease',
    'Happiness',
    'Sleep Better',
    'Positivity',
    'Daily Inspiration',
  ];

  openFilterModal(typeOffilter: string) {
    if (typeOffilter === 'Duration') {
      this.isFilterOpen = true;
      this.filterTitle = 'Duration';
      // setTimeout(() => {
      //   const thumbs = this.elementRef.nativeElement.querySelectorAll(
      //     '.mdc-slider__thumb-knob'
      //   );
      //   thumbs.forEach((thumb: HTMLElement) => {
      //     this.renderer.removeStyle(thumb, 'margin');
      //   });
      //   this.renderer.setStyle(thumbs[1], 'margin', '0 13px 0 10px');
      // }, 100);
    } else if (typeOffilter === 'Goal') {
      this.isFilterOpen = true;
      this.filterTitle = 'Goal';
    }
  }

  closeFilterModal() {
    this.isFilterOpen = false;
  }

  goBack() {
    this.router.navigate(['tabs/dashboard']);
  }

  onSliderChange() {
    console.log('Start Value:', this.startTimeValue);
    console.log('End Value:', this.endTimeValue);
  }

  getGoal(index: number | null) {
    const goalItem = this.filterList.find((item) => item.filterName === 'Goal');
    if (goalItem && index !== null) {
      goalItem.selectedGoal = this.goalList[index];
    } else {
      console.log('No goal selected.');
    }
    this.isFilterOpen = false;
  }

  getDuration() {
    const durationString = `${this.startTimeValue} min - ${this.endTimeValue} min`;
    const durationItem = this.filterList.find(
      (item) => item.filterName === 'Duration'
    );

    if (durationItem) {
      durationItem.selectedDuration = durationString;
    }
    this.isFilterOpen = false;
  }

  clearOpenPopUP() {
    this.isPopUpOpen = true;
  }

  clearAllFilters() {
    for (const item of this.filterList) {
      item.selectedDuration = '';
      item.selectedGoal = '';
    }
  }
  stopPropagation(event: Event) {
    event.stopPropagation();
  }
  clearAllitem() {
    this.isPopUpOpen = false;
    this.clearAllFilters();
    this.cdRef.detectChanges();
  }
  closePopUp() {
    this.isPopUpOpen = false;
  }
  hasSelectedFilters(): boolean {
    for (const iterator of this.filterList) {
      if (iterator.selectedDuration || iterator.selectedGoal) {
        debugger
        return true;
      }
    }
    return false;
  }
  ngOnInit(): void {
    // this.isFilterOpen = true;
    // this.filterTitle = 'Duration';
  }
  ngAfterViewInit(): void {}
}
