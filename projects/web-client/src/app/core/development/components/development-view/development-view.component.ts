import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/aspects/navigation/api';

@Component({
  selector: 'app-development-view',
  templateUrl: './development-view.component.html',
  styleUrls: ['./development-view.component.scss']
})
export class DevelopmentViewComponent implements OnInit {

  constructor(
    private readonly _routingService: RoutingService
  ) { }

  ngOnInit(): void { }
  
  public navigateToDungeonPlayground() {
    this._routingService.navigateToDungeonPlayground();
  }

}