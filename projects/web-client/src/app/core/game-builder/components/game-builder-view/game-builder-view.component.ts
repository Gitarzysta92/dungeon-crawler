import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { GameBuilderStateStore } from '../../stores/game-builder-state.store';

@Component({
  selector: 'game-builder',
  templateUrl: './game-builder-view.component.html',
  styleUrls: ['./game-builder-view.component.scss'],
  providers: [
    GameBuilderStateStore
  ]
})
export class GameBuilderViewComponent implements OnInit {

  constructor(
    private readonly _routingService: RoutingService,
    private readonly _gameBuilderStateStore: GameBuilderStateStore
  ) { }

  async ngOnInit(): Promise<void> {

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