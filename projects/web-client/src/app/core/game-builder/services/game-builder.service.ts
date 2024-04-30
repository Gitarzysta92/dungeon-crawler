import { v4 } from "uuid";
import { Injectable } from "@angular/core";
import { FormStep, GameBuilderState } from "../state/game-builder.state";
import { ConfigurationService } from "src/app/infrastructure/configuration/api";
import { HeroBuilder } from "@game-logic/gameplay/modules/heroes/builder/hero.builder";
import { AdventureBuilder } from "@game-logic/gameplay/modules/adventure/builder/adventure.builder";
import { PlayerType } from "@game-logic/lib/base/player/players.constants";
import { IAdventureGameplay } from "../../adventure/interfaces/adventure-gameplay.interface";


@Injectable()
export class GameBuilderService {

  constructor(
    private readonly _configurationService: ConfigurationService
  ) { }

  public async createGame(process: GameBuilderState): Promise<IAdventureGameplay> {
    const hero = HeroBuilder.build(process.hero, process.steps as any);
    const player = { id: v4(), playerType: PlayerType.Human, groupId: "6F247EBD-7757-46CE-9A86-17DB15E3E82B" };
    hero.narrative.name = (process.steps[3] as FormStep).data.name;
    const adventure = AdventureBuilder.build(player, hero, process.adventure);
    await process.entityService.hydrate(adventure);
    return Object.assign(adventure, { gameVersion: this._configurationService.version, persistedGameDataId: null })
  }
}