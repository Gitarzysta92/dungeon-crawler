import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/aspects/navigation/api';

@Component({
  selector: 'app-hall-view',
  templateUrl: './hall-view.component.html',
  styleUrls: ['./hall-view.component.scss']
})
export class HallViewComponent implements OnInit {

  constructor(
    private readonly _routingService: RoutingService
  ) { }

  ngOnInit(): void {
  }


  navigateToDungeon(): void {
    this._routingService.navigateToHotseatGame('dupa')
  }

}
