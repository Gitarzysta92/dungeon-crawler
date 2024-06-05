import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { SceneService } from 'src/app/core/scene/services/scene.service';
import { SettingsStore } from 'src/app/core/settings/stores/settings.store';
import { IGame } from '../../interfaces/game.interface';
import { Store } from '@utils/store/store';


@Component({
  selector: 'game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss'],
})
export class GameViewComponent implements OnInit, OnDestroy {
  
  public isEditorActive: boolean = false;
  public sceneService: SceneService;
  public stateStore: Store<IGame>;
  
  private _path: any;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _routingService: RoutingService,
    private readonly _settingsStore: SettingsStore,
  ) {}

  ngOnInit(): void {
    this._path = this._activatedRoute.snapshot.data.gameplayUrl;
    this._routingService.nav([this._path], this._activatedRoute);
  }

  ngOnDestroy(): void {

  }

  public toggleEditor(s?: boolean) {
    this.isEditorActive = s ?? true;
    this._settingsStore.toggleGameplayInteractions(!s ?? !this.isEditorActive);
  }

  public gameChanged(gameComponent: any) {
    this.sceneService = gameComponent.sceneService;
    this.stateStore = gameComponent.stateStore;
    
  }
}
