import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/aspects/navigation/api';

@Component({
  selector: 'app-main-menu-view',
  templateUrl: './main-menu-view.component.html',
  styleUrls: ['./main-menu-view.component.scss']
})
export class MainMenuViewComponent implements OnInit {

  constructor(
    private readonly _routingService: RoutingService
  ) { }

  ngOnInit(): void {
  }

  startGame() {
    this._routingService.navigateToGame()
  }

}
