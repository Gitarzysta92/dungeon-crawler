import { Injectable } from "@angular/core";
import { AdventureBuilder } from "@game-logic/gameplay/modules/adventure/builder/adventure.builder";
import { ConfigurationService } from "src/app/infrastructure/configuration/api";
import { DataFeedService } from "../../game-data/services/data-feed.service";
import { IAdventureGameplayState } from "./adventure-gameplay.interface";
import { IHeroDeclaration } from "@game-logic/gameplay/modules/heroes/mixins/hero/hero.interface";

@Injectable()
export class AdventureGameplayBuilder {

  constructor(
    private readonly _configurationService: ConfigurationService,
    private readonly _dataFeed: DataFeedService
  ) { }

  public async createGame(heroDeclaration: IHeroDeclaration): Promise<IAdventureGameplayState> {
    const adventureDeclaration = await this._dataFeed.getAdventureMap();
    Object.assign(heroDeclaration, { position: { r: 0, q: 0, s: 0 } });
    const adventure = AdventureBuilder.build(heroDeclaration, adventureDeclaration);
    return Object.assign({
      gameVersion: this._configurationService.version,
      persistedGameDataId: null,
      narrative: { name: "", description: "" },
      scene: { composerDeclarations: [] },
      isNarrationMedium: true as const,
      isMixin: true as const,
      isSceneMedium: true as const
    }, adventure)
  }
}


// const hero = HeroBuilder.build(heroDeclaration, recipe);



    // hero.groupId = player.groupId;
    // hero.playerId = player.id;