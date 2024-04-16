import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { DungeonStateStore } from 'src/app/core/dungeon/stores/dungeon-state.store';
import { SceneService } from 'src/app/core/dungeon-scene/services/scene.service';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { StoreService } from 'src/app/infrastructure/data-store/api';


@Component({
  templateUrl: './dungeon-view.component.html',
  styleUrls: ['./dungeon-view.component.scss'],
})
export class DungeonViewComponent implements AfterViewInit, OnDestroy {

  constructor(
    private readonly _routingService: RoutingService,
    private readonly _sceneService: SceneService,
    private readonly _dungeonStateStore: DungeonStateStore,
    private readonly _storeService: StoreService,
  ) { }

  ngAfterViewInit(): void {
    const { visual } = this._dungeonStateStore.currentState
    this._sceneService.initializeScene({ bgColor: visual.scene.bgColor, composerDefinitions: visual.scene.composerDefinitions });
    this.startDungeon();
  }

  ngOnDestroy(): void {
    this._storeService.closeStore(this._dungeonStateStore);
  }

  public async startDungeon(): Promise<void> {
    while (!this._dungeonStateStore.currentState.isDungeonFinished) {
      const player = this._dungeonStateStore.currentState.getCurrentPlayer();
      if (!player.canPerformTurn(this._dungeonStateStore)) {
        continue;
      }
      await player.performTurn(this._dungeonStateStore);
    }
    this._finishedDungeon()
  }
  
  private async _finishedDungeon(): Promise<void> {
    await this._dungeonStateStore.dispatch(leaveDungeon())
    this._storeService.closeStore(this._dungeonStateStore);
    this._routingService.nagivateToDungeonSummary(this._dungeonStateStore.currentState.id);
  }

}