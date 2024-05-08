import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { NavigationLoadingScreenService } from 'src/app/aspects/navigation/services/navigation-loading-screen.service';
import { GAME_LOADING_SCREEN } from '../../constants/game-loader.constants';
import { GameLoadingScreenComponent } from '../game-loading-screen/game-loading-screen.component';

@Component({
  selector: 'game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss']
})
export class GameViewComponent implements OnInit, OnDestroy {
  private _path: any;
  private _loader: any;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _routingService: RoutingService,
    private readonly _navigationLoaderService: NavigationLoadingScreenService,
  ) {}

  ngOnInit(): void {
    this._path = this._activatedRoute.snapshot.data.gameplayUrl;
    this._routingService.nav([this._path], this._activatedRoute);
    this._loader = this._navigationLoaderService
      .handleNavigation(GAME_LOADING_SCREEN, GameLoadingScreenComponent, 2000);
  }

  ngOnDestroy(): void {
    this._loader.unsubscribe();
  }

}
