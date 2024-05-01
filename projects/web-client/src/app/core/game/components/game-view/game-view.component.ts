import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from 'src/app/aspects/navigation/api';

@Component({
  selector: 'game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss']
})
export class GameViewComponent implements OnInit {
  private _path: any;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _routingService: RoutingService
  ) {}

  ngOnInit(): void {
    this._path = this._activatedRoute.snapshot.data.gameplayUrl;
    this._routingService.nav([this._path], this._activatedRoute);
  }

  // onDeactivate(x: any) {
  //   console.log('deactivate', this._path, this._activatedRoute)
  //   this._routingService.nav([this._path], this._activatedRoute);
  // }

}
