import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { DungeonStateStore } from 'src/app/core/dungeon/stores/dungeon-state.store';
import { SceneService } from 'src/app/core/scene/services/scene.service';
import { StoreService } from 'src/app/infrastructure/data-storage/api';
import { PlayerType } from '@game-logic/lib/base/player/players.constants';
import { GuiTurnService } from '../../services/gui-turn.service';
import { ApiTurnService } from '../../services/api-turn.service';


@Component({
  templateUrl: './dungeon-view.component.html',
  styleUrls: ['./dungeon-view.component.scss'],
})
export class DungeonViewComponent implements AfterViewInit, OnDestroy {

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _dungeonStateStore: DungeonStateStore,
    private readonly _storeService: StoreService,
    private readonly _guiTurnService: GuiTurnService,
    private readonly _apiTurnService: ApiTurnService
  ) { }

  ngAfterViewInit(): void {
    this._sceneService.initializeScene({ composerDeclarations: this._dungeonStateStore.currentState.scene.composerDeclarations });
    this.startDungeon();
  }

  ngOnDestroy(): void {
    this._storeService.closeStore(this._dungeonStateStore);
  }

  public async startDungeon(): Promise<void> {
    while (!this._dungeonStateStore.currentState.isDungeonFinished) {
      const player = this._dungeonStateStore.currentState.getCurrentPlayer();
      if (!player.canPerformTurn()) {
        continue;
      }

      if (player.playerType === PlayerType.Computer) {
        await this._guiTurnService.handleTurn()
      } else {
        await this._apiTurnService.handleTurn();
      }
    }
    this._finishedDungeon()
  }
  
  private async _finishedDungeon(): Promise<void> {
    //await this._dungeonStateStore.dispatch(leaveDungeon())
    this._storeService.closeStore(this._dungeonStateStore);
    //this._routingService.nagivateToDungeonSummary(this._dungeonStateStore.currentState.id);
  }

}