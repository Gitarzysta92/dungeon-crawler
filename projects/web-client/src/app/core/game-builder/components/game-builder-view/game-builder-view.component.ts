import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { ISpellOrAbilityDataFeedEntity } from 'src/app/core/data-feed/interfaces/data-feed-effect-entity.interface';
import { IHeroDataFeedEntity } from 'src/app/core/data-feed/interfaces/data-feed-hero-entity.interface';
import { DataFeedService } from 'src/app/core/data-feed/services/data-feed.service';
import { PersistedGameProgressionService } from 'src/app/core/game-persistence/services/persisted-game-progression/persisted-game-progression.service';
import { ProgressionCreatorService } from 'src/app/core/game-builder/services/progression-creator/progression-creator.service';

@Component({
  selector: 'app-game-builder',
  templateUrl: './game-builder-view.component.html',
  styleUrls: ['./game-builder-view.component.scss']
})
export class GameBuilderViewComponent implements OnInit {

  public heroTemplates: IHeroDataFeedEntity[];
  public selectedHero: IHeroDataFeedEntity;
  public heroName: string = '';
  public spellsAndAbilities: ISpellOrAbilityDataFeedEntity[];
  
  constructor(
    private readonly _gameCreatorService: ProgressionCreatorService,
    private readonly _routingService: RoutingService,
    private readonly _persistedGameProgressionService: PersistedGameProgressionService,
    private readonly _dataFeedService: DataFeedService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.heroTemplates = await this._dataFeedService.getHeroTemplates();
    this.selectedHero = this.heroTemplates[0];
    this.spellsAndAbilities = await this._dataFeedService.getSpellsAndAbilities();
  }

  public selectHero(heroTemplate: IHeroDataFeedEntity): void {
    this.selectedHero = heroTemplate;
  }
  
  public async createGame() {
    const state = await this._gameCreatorService.createGame(
      this.heroName,
      this.selectedHero.visualUi.avatar.url,
      this.selectedHero
    );
    if (!state) {
      throw new Error('Unable to create new game');
    }

    this._persistedGameProgressionService.loadProgression({ adventureState: state });
    this._routingService.navigateToGame();
  }

}
