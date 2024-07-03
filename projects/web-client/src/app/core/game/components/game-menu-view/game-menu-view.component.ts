import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/aspects/navigation/api';

@Component({
  selector: 'game-menu-view',
  templateUrl: './game-menu-view.component.html',
  styleUrls: ['./game-menu-view.component.scss']
})
export class GameMenuViewComponent implements OnInit {

  constructor(
    private readonly _routingService: RoutingService
  ) { }

  ngOnInit(): void {
  }

  exitGame(): void {
    this._routingService.navigateToMainMenu();
  }

}
