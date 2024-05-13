import { v4 } from "uuid";
import { Injectable } from "@angular/core";
import { FormStep, GameBuilderState } from "../state/game-builder.state";
import { ConfigurationService } from "src/app/infrastructure/configuration/api";
import { HeroBuilder } from "@game-logic/gameplay/modules/heroes/builder/hero.builder";
import { AdventureBuilder } from "@game-logic/gameplay/modules/adventure/builder/adventure.builder";
import { PlayerType } from "@game-logic/lib/base/player/players.constants";
import { IDENTITY_STEP_NAME } from "../constants/game-builder.constants";
import { IAdventureStateDeclaration } from "@game-logic/gameplay/modules/adventure/mixins/adventure-state/adventure-state.interface";
import { IPersistableGameState } from "../../game-persistence/interfaces/persisted-game.interface";
import { IGameMetadata } from "../interfaces/game-metadata.interface";
import { INarrationMedium } from "../../game-ui/entities/narrative-medium/narrative-medium.interface";
import { IVisualMedium } from "../../game-ui/entities/visual-medium/visual-medium.interface";


@Injectable()
export class GameBuilderService {

  constructor(
    private readonly _configurationService: ConfigurationService
  ) { }

  public async createGame(process: GameBuilderState): Promise<IAdventureStateDeclaration & IGameMetadata & IPersistableGameState & INarrationMedium & IVisualMedium> {
    const hero = HeroBuilder.build(process.hero, process.steps as any);
    const player = { id: v4(), playerType: PlayerType.Human, groupId: "6F247EBD-7757-46CE-9A86-17DB15E3E82B" };
    const identityData = (process.steps.find(s => s.stepName === IDENTITY_STEP_NAME) as FormStep<{ name: string, avatarUrl: string }>).data;
    hero.narrative.name = identityData.name;
    hero.visual.ui.avatar = { url: identityData.avatarUrl };
    const adventure = AdventureBuilder.build(player, hero, process.adventure);
    await process.entityService.hydrate(adventure);
    return Object.assign({
      gameVersion: this._configurationService.version,
      persistedGameDataId: null,
      isNarrationMedium: true as const,
      isVisualMedium: true as const,
      narrative: { name: "", description: "" },
      visual: {}
    }, adventure)
  }
}