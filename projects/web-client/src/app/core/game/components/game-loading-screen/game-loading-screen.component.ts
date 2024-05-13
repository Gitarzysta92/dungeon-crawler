import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'game-loading-screen',
  templateUrl: './game-loading-screen.component.html',
  styleUrls: ['./game-loading-screen.component.scss'],
  animations: [
    trigger('animation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s', style({ opacity: 1 }))
      ]),
    ]),
  ]
})
export class GameLoadingScreenComponent implements OnInit {

  @HostBinding('@animation') animation = true;

  public imgAsset = { url: "/backgrounds/city.png" }

  constructor() { }

  ngOnInit(): void {
    
  }

}
