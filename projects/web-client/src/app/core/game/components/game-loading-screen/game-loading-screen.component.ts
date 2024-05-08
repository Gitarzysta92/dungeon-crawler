import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-loading-screen',
  templateUrl: './game-loading-screen.component.html',
  styleUrls: ['./game-loading-screen.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),  // Start with an invisible state
        animate('0.3s', style({ opacity: 1 }))  // Animate to an opaque state
      ]),
      transition(':leave', [
        style({ opacity: 1 }),  // Start with an opaque state
        animate('0.3s', style({ opacity: 0 }))  // Animate to an invisible state
      ])
    ])
  ]
})
export class GameLoadingScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
