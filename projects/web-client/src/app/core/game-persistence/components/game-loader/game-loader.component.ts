import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { IGameSave } from '../../interfaces/persisted-game.interface';
import { GameSavesStore } from '../../stores/game-saves.store';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'game-loader',
  templateUrl: './game-loader.component.html',
  styleUrls: ['./game-loader.component.scss']
})
export class GameLoaderComponent implements OnInit {
  gameSaves$: Observable<Array<IGameSave & { isSelected: boolean}>>;
  
  constructor(
    private readonly _routingService: RoutingService,
    private readonly _gamesStateStore: GameSavesStore
  ) { }

  async ngOnInit(): Promise<void> {
    this.gameSaves$ = this._gamesStateStore.state$
      .pipe(map(s => s.savedGames.map(sg => Object.assign({ isSelected: s.selectedGameSaveId === sg.persistedGameDataId }, sg))));
  }


  public removeGameSave(save: IGameSave): void {
    this._gamesStateStore.removeGameSave(save)
  }

  public selectGameSave(save: IGameSave): void {
    this._gamesStateStore.selectGameSave(save.id);
  }

  public backToMainMenu(): void {
    this._routingService.navigateToMainMenu();
  }

  public createNewGame(): void {
    this._routingService.navigateToGameBuilder();
  }

}
