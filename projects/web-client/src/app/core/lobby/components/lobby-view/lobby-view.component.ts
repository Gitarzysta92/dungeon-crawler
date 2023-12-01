import { Component, OnInit } from '@angular/core';
import { fadeInMultipleElements, slideInFromTopMultipleElements } from 'src/app/shared/animations/predefined-animations';
import { LobbyItem } from '../../models/lobby-item';

const lobbyItems = [
  new LobbyItem({
    type: 'gameMode',
    size: '2',
    config: { modeId: 1 }
  }),
  new LobbyItem({
    type: 'gameMode',
    size: '2',
    config: { modeId: 2 }
  }),
  new LobbyItem({
    type: 'gameMode',
    size: '2',
    config: { modeId: 3 }
  }),
  new LobbyItem({
    type: 'gameMode',
    size: '4',
    config: { modeId: 4 }
  }),
]


@Component({
  selector: 'app-lobby-view',
  templateUrl: './lobby-view.component.html',
  styleUrls: ['./lobby-view.component.scss'],
  animations: [
    slideInFromTopMultipleElements('slideInTop'),
    fadeInMultipleElements('fadeIn')  
  ]
})
export class LobbyViewComponent implements OnInit {
  public lobbyItems: LobbyItem[] = [];
  
  public showGames: boolean = false;
  public showNotifications: boolean = false;
  
  constructor() { }
  
  ngOnInit(): void {
    this.lobbyItems = lobbyItems; 
  }
}