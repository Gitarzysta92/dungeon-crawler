import { Injectable } from "@angular/core";
import { IDungeonGameplayFeed, IDungeonGameplayStateDto } from "@game-logic/gameplay/state/dungeon/dungeon-gameplay.interface";
import { GameLogicLibraryFactory } from "@game-logic/lib";
import { CastEffectCommand } from "../commands/cast-effect.command";
import { MediaModule } from "../../game-ui/media.module";
import { DungeonGameplayState } from "./dungeon-gameplay.state";
import { AbilityModule } from "@game-logic/lib/modules/abilities/abilities.module";
import { ActorModule } from "@game-logic/lib/modules/actors/actors.module";
import { BoardModule } from "@game-logic/lib/modules/board/board.module";
import { EffectsModule } from "@game-logic/lib/modules/effects/effects.module";
import { QuestModule } from "@game-logic/lib/modules/quest/quest.module";
import { RewardModule } from "@game-logic/lib/modules/rewards/rewards.module";
import { TurnBasedGameplayModule } from "@game-logic/lib/modules/turn-based-gameplay/turn-based-gameplay.module";
import { VendorsModule } from "@game-logic/lib/modules/vendors/vendors.module";

@Injectable()
export class DungeonStateFactory {

  constructor() { }

  public async initializeDungeonGameplay(
    stateDto: IDungeonGameplayStateDto,
    dataFeed: IDungeonGameplayFeed,
  ) {
    const lib = GameLogicLibraryFactory.create();
    (new MediaModule(lib.entityService)).initialize();
    this._initializeCommands(lib);

    const turnBasedGameplayModule = new TurnBasedGameplayModule(lib.eventService).initialize();
    const actorModule = new ActorModule(dataFeed, lib.entityService, lib.actionService, lib.selectorService, lib.eventService).initialize();
    const boardModule = new BoardModule(lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.eventService).initialize();
    const effectModule = new EffectsModule(lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.modifierService, lib.eventService).initialize();
    const questModule = new QuestModule(dataFeed, lib.entityService, lib.eventService, lib.conditionsService, lib.activityService).initialize();
    const abilityModule = new AbilityModule(dataFeed, lib.entityService, lib.actionService, lib.modifierService, lib.selectorService).initialize();
    const tradeModule = new VendorsModule(lib.entityService, lib.activityService).initialize();
    const rewardsModule = new RewardModule(lib.entityService, lib.actionService, lib.modifierService, lib.eventService, lib.activityService).initialize();

    lib.entityService.hydrate(stateDto);

    this._initializePlayers(stateDto)

    return new DungeonGameplayState(
      lib.entityService,
      turnBasedGameplayModule.turnBasedService,
      actorModule.actorSevice,
      boardModule.boardService,
      effectModule.effectService,
      questModule.questService,
      abilityModule.abilitiesService,
      tradeModule.tradeService,
      rewardsModule.rewardsService
    );
  }

  private _initializeCommands(lib: ReturnType<typeof GameLogicLibraryFactory.create>) {
    lib.entityService.useFactories([
      new CastEffectCommand(),
    ])
  }

  private _initializePlayers(stateDto: IDungeonGameplayStateDto): void {
    // stateDto.players = stateDto.players.map(p => {
    //   if (p.playerType === PlayerType.Human) {
    //    return 
    //   }
    // })
  }

}
