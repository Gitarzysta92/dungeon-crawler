import { Injectable } from "@angular/core";
import { DataFeedService } from "../../game-data/services/data-feed.service";
import { DungeonBuilder } from "@game-logic/gameplay/modules/dungeon/builder/dungeon.builder";
import { ConfigurationService } from "src/app/infrastructure/configuration/api";
import { IHeroDeclaration } from "@game-logic/gameplay/modules/heroes/mixins/hero/hero.interface";
import { IDungeonAreaDeclaration } from "@game-logic/gameplay/modules/dungeon/mixins/dungeon-area/dungeon-area.interface";
import { IDungeonGameplayState } from "./dungeon-gameplay.interface";

@Injectable()
export class DungeonGameplayBuilder {

  constructor(
    private readonly _dataFeed: DataFeedService,
    private readonly _configurationService: ConfigurationService
  ) { }

  public async createDungeon(
    visitedDungeon: IDungeonAreaDeclaration,
    heroes: IHeroDeclaration[],
    persistedGameDataId: string
  ): Promise<IDungeonGameplayState> {
    const dungeonTemplate = await this._dataFeed.getDungeonTemplate(visitedDungeon.dungeonId);
    const dungeon = await DungeonBuilder.build(visitedDungeon, dungeonTemplate, heroes);

    for (let entity of dungeon.entities) {
      if ((entity as any)?.deck?.drawPile?.pile) {
        for (let card of (entity as any)?.deck?.drawPile?.pile) {
          card.isUiMedium = true;
        }
      }
    }


    return Object.assign({
      isGameStarted: false,
      gameVersion: this._configurationService.version,
      persistedGameDataId: persistedGameDataId,
      currentPlayerId: null,
      turn: null,
      round: null,
      order: [],
      isNarrationMedium: true as const,
      isSceneMedium: true as const,
      isMixin: true as const,
      narrative: { name: "", description: "" },
      scene: dungeonTemplate.scene
    }, dungeon)
  }
}