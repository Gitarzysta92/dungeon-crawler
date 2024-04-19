import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { GameBuilderStateStore } from '../../stores/game-builder-state.store';
import { map } from 'rxjs';

@Component({
  selector: 'game-builder',
  templateUrl: './game-builder-view.component.html',
  styleUrls: ['./game-builder-view.component.scss'],
})
export class GameBuilderViewComponent implements OnInit {
  hero$: any;

  constructor(
    private readonly _routingService: RoutingService,
    private readonly _gameBuilderStateStore: GameBuilderStateStore
  ) { }

  async ngOnInit(): Promise<void> {
    this.hero$ = this._gameBuilderStateStore.state$.pipe(map(s => s))
    this._gameBuilderStateStore.state$.pipe(map(s => s)).subscribe();
    console.log(this._gameBuilderStateStore.currentState)
  }

  // public selectHero(heroTemplate: IHeroDataFeedEntity): void {
    
  // }

}



// public async createGame() {
//   const state = await this._gameCreatorService.createGame(
//     this.heroName,
//     this.selectedHero.visualUi.avatar.url,
//     this.selectedHero
//   );
//   if (!state) {
//     throw new Error('Unable to create new game');
//   }

//   this._persistedGameProgressionService.loadProgression({ adventureState: state });
//   this._routingService.navigateToGame();
// }