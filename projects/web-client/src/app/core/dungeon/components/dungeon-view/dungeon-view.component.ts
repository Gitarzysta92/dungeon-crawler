import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { DungeonStateStore } from 'src/app/core/dungeon/stores/dungeon-state.store';
import { SceneService } from 'src/app/core/scene/services/scene.service';
import { StoreService } from 'src/app/infrastructure/data-storage/api';
import { GuiTurnService } from '../../services/gui-turn.service';
import { ApiTurnService } from '../../services/api-turn.service';
import { IEntity } from '@game-logic/lib/base/entity/entity.interface';
import { ISceneMedium } from 'src/app/core/scene/mixins/scene-medium/scene-medium.interface';
import { IAuxiliaryView } from 'src/app/core/game-ui/interfaces/auxiliary-view.interface';
import { Observable, map } from 'rxjs';
import { IMenuItem } from 'src/app/aspects/navigation/interfaces/navigation.interface';
import { GameUiStore } from 'src/app/core/game-ui/stores/game-ui.store';
import { GameMenuViewComponent } from 'src/app/core/game/components/game-menu-view/game-menu-view.component';
import { HeroViewComponent } from 'src/app/core/game/components/hero-view/hero-view.component';
import { AuxiliaryViewService } from 'src/app/core/game-ui/services/auxiliary-view.service';
import { UiService } from 'src/app/core/game-ui/services/ui.service';
import { CommandsService } from 'src/app/core/game/services/commands.service';
import { SceneAssetsLoaderService } from 'src/app/core/scene/services/scene-assets-loader.service';
import { AdventureSuggestionService } from 'src/app/core/adventure/services/adventure-suggestion.service';
import { SuggestionService } from 'src/app/core/game/services/suggestion.service';


@Component({
  templateUrl: './dungeon-view.component.html',
  styleUrls: ['./dungeon-view.component.scss'],
  providers: [
    SceneAssetsLoaderService,
    CommandsService,
    UiService,
    { provide: SuggestionService, useClass: AdventureSuggestionService },
    AdventureSuggestionService,
    AuxiliaryViewService,
  ]
})
export class DungeonViewComponent implements OnInit, AfterViewInit, OnDestroy {

  public menu$: Observable<IMenuItem[]>;

  constructor(
    public readonly sceneService: SceneService,
    public readonly stateStore: DungeonStateStore,
    private readonly _storeService: StoreService,
    private readonly _guiTurnService: GuiTurnService,
    private readonly _apiTurnService: ApiTurnService,
    private readonly _gameUiStore: GameUiStore,
    private readonly _auxiliaryViewService: AuxiliaryViewService,
  ) { }

  ngOnInit(): void {
    this.makeUiAdjustments();
  }

  ngAfterViewInit(): void {
    const { scene, entities } = this.stateStore.currentState;
    this.sceneService.initializeScene(scene.composerDeclarations, entities.filter(e => e.isSceneMedium) as Array<IEntity &ISceneMedium>);
    this.startDungeon();
  }

  ngOnDestroy(): void {
    this._storeService.closeStore(this.stateStore);
  }

  public handleEntityClick(v: any) {

  }

  public async startDungeon(): Promise<void> {
    // while (!this._dungeonStateStore.currentState.isDungeonFinished) {
    //   const player = this._dungeonStateStore.currentState.getCurrentPlayer();
    //   if (!player.canPerformTurn()) {
    //     continue;
    //   }

    //   if (player.playerType === PlayerType.Computer) {
    //     await this._guiTurnService.handleTurn()
    //   } else {
    //     await this._apiTurnService.handleTurn();
    //   }
    // }
    // this._finishedDungeon()
  }
  
  private async _finishedDungeon(): Promise<void> {
    //await this._dungeonStateStore.dispatch(leaveDungeon())
    this._storeService.closeStore(this.stateStore);
    //this._routingService.nagivateToDungeonSummary(this._dungeonStateStore.currentState.id);
  }

  public selectTopBarItem(v: IAuxiliaryView): void {
    if (v.component === HeroViewComponent) {
      this._auxiliaryViewService.openAuxiliaryView(v,{ hero: this.stateStore.currentState.getSelectedPawn() });
    }

    if (v.component === GameMenuViewComponent) {
      this._auxiliaryViewService.openAuxiliaryView(v);
    }
  }


  public makeUiAdjustments() {
    this.menu$ = this._gameUiStore.state$.pipe(map(s => s.auxiliaryViews));
  }

}