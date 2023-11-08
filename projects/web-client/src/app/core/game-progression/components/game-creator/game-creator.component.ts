import { Component, OnInit } from '@angular/core';
import { ProgressionCreatorService } from '../../services/progression-creator/progression-creator.service';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { PersistedGameProgressionService } from '../../services/persisted-game-progression/persisted-game-progression.service';
import { DataFeedService } from 'src/app/core/data-feed/services/data-feed.service';
import { IHeroDataFeedEntity } from 'src/app/core/data-feed/interfaces/data-feed-hero-entity.interface';
import { ISpellOrAbilityDataFeedEntity } from 'src/app/core/data-feed/interfaces/data-feed-effect-entity.interface';

@Component({
  selector: 'game-creator',
  templateUrl: './game-creator.component.html',
  styleUrls: ['./game-creator.component.scss']
})
export class GameCreatorComponent implements OnInit {

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