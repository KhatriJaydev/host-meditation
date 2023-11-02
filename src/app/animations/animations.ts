import {
  trigger,
  transition,
  style,
  animate,
  keyframes,
} from '@angular/animations';

export const fade = trigger('fade', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
]);

export const fadeInRightAndSlide = trigger('fadeInRightAndSlide', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(100%)' }),
    animate(
      '500ms ease-in-out',
      style({ opacity: 1, transform: 'translateX(0)' })
    ),
  ]),
  transition(':leave', [
    animate(
      '500ms ease-in-out',
      style({ opacity: 0, transform: 'translateX(100%)' })
    ),
  ]),
]);

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    animate(
      '1000ms ease-in-out',
      keyframes([
        style({ opacity: 0, offset: 0 }), // start at 0%
        style({ opacity: 1, offset: 1 }), // end at 100%
      ])
    ),
  ]),
  transition(':leave', [animate('100ms ease-in-out', style({ opacity: 0 }))]),
]);
