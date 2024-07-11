import { trigger, transition, style, animate } from '@angular/animations';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { ILoadingScreen } from 'src/app/shared/loaders/interfaces/loading-screen.interface';

@Component({
  selector: 'basic-loading-screen',
  templateUrl: './basic-loading-screen.component.html',
  styleUrls: ['./basic-loading-screen.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),  // Start with an invisible state
        animate('0.3s', style({ opacity: 1 }))  // Animate to an opaque state
      ]),
      // transition(':leave', [
      //   style({ opacity: 1 }),  // Start with an opaque state
      //   animate('0.3s', style({ opacity: 0 }))  // Animate to an invisible state
      // ])
    ])
  ]
})
export class BasicLoadingScreenComponent implements OnInit, ILoadingScreen {

  @Input() skipAnimation = true;
  @HostBinding('@fadeAnimation') get animation(): boolean { return this.skipAnimation }

  constructor() { }

  ngOnInit(): void {
  }

}
