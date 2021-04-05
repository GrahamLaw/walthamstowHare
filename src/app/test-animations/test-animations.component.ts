import { trigger,  state,  style,  animate,  transition } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

const enterTransition = transition(':enter', [
  style({
    opacity: 0
  }),
  animate('1s ease-in', style({
    opacity: 1
  }))
]);

const leaveTrans = transition(':leave', [
  style({
    opacity: 1
  }),
  animate('1s ease-out', style({
    opacity: 0
  }))
])

const fadeIn = trigger('fadeIn', [
  enterTransition
]);

const fadeOut = trigger('fadeOut', [
  leaveTrans
]);

@Component({
  selector: 'app-test-animations',
  templateUrl: './test-animations.component.html',
  styleUrls: ['./test-animations.component.scss'],
  animations: [
    fadeIn,
    fadeOut,
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0,
        backgroundColor: 'green'
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],

})
export class TestAnimationsComponent {

  isOpen = true;
  show = true;

  async toggle(): Promise<void> {
    this.isOpen = !this.isOpen;
    this.show = false;
    await this.delay(1000);
    this.isOpen = !this.isOpen;
    this.show = true;
    /* setTimeout (() => {
      this.isOpen = !this.isOpen;
    }, 2000); */
  }


  private delay(ms: number)
  {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
