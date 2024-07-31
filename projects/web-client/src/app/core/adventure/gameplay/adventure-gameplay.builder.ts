import { Injectable } from "@angular/core";
import { HeroBuilder } from "@game-logic/gameplay/modules/heroes/builder/hero.builder";
import { AdventureBuilder } from "@game-logic/gameplay/modules/adventure/builder/adventure.builder";
import { commonTileComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/tokens/common-tile/common-tile.constants";
import { ConfigurationService } from "src/app/infrastructure/configuration/api";
import { DataFeedService } from "../../game-data/services/data-feed.service";
import { IHeroRecipe } from "@game-logic/gameplay/modules/heroes/builder/hero-builder.interface";
import { IAdventureGameplayState } from "./adventure-gameplay.interface";

@Injectable()
export class AdventureGameplayBuilder {

  constructor(
    private readonly _configurationService: ConfigurationService,
    private readonly _dataFeed: DataFeedService
  ) { }

  public async createGame(heroName: string, heroAvatar: string, recipe: IHeroRecipe): Promise<IAdventureGameplayState> {
    const heroDeclaration =  await this._dataFeed.getHeroTemplate()
    const hero = HeroBuilder.build(heroDeclaration, recipe);
    Object.assign(hero, { narrative: { name: heroName } });
    Object.assign(hero, { uiData: { avatar: { url: heroAvatar } } });
    Object.assign(hero, { position: { r: 0, q: 0, s: 0 } });
    Object.assign(hero, {
      scene: {
        composerDeclarations: [
          {
            definitionName: commonTileComposerDefinitionName,
            primaryColor: 0x31386c,
            jawelColor: 0xeb6f36,
            texture: {
              assetName: "hero",
              extensionName: "png",
              dir: "/actors"
            },
            outlets: hero.outlets
          }
        ]
      }
    });

    const adventureDeclaration = await this._dataFeed.getAdventureMap()
    const adventure = AdventureBuilder.build(hero, adventureDeclaration);
    return Object.assign({
      gameVersion: this._configurationService.version,
      persistedGameDataId: null,
      isNarrationMedium: true as const,
      isSceneMedium: true as const,
      narrative: { name: "", description: "" },
      scene: { composerDeclarations: [] },
      isMixin: true as const
    }, adventure)
  }
}





    // hero.groupId = player.groupId;
    // hero.playerId = player.id;