import { Injectable } from "@angular/core";
import { GameLogicLibraryFactory } from "@game-logic/lib";
import { CastEffectCommand } from "../commands/cast-effect.command";
import { UiModule } from "../../game-ui/media.module";
import { AbilityModule } from "@game-logic/lib/modules/abilities/abilities.module";
import { ActorModule } from "@game-logic/lib/modules/actors/actors.module";
import { BoardModule } from "@game-logic/lib/modules/board/board.module";
import { EffectsModule } from "@game-logic/lib/modules/effects/effects.module";
import { QuestModule } from "@game-logic/lib/modules/quest/quest.module";
import { RewardModule } from "@game-logic/lib/modules/rewards/rewards.module";
import { TurnBasedGameplayModule } from "@game-logic/lib/modules/turn-based-gameplay/turn-based-gameplay.module";
import { VendorsModule } from "@game-logic/lib/modules/vendors/vendors.module";
import { IDungeonStateDeclaration } from "@game-logic/gameplay/modules/dungeon/mixins/dungeon-state/dungeon-state.interface";
import { IDungeonGameplayFeed } from "@game-logic/gameplay/modules/dungeon/dungeon.interface";
import { IDungeonGameplayState } from "../interfaces/dungeon-gameplay-state.interface";

@Injectable()
export class DungeonGameplayStateFactoryService {

  constructor() { }

  public async initializeDungeonGameplay(
    state: IDungeonStateDeclaration,
    dataFeed: IDungeonGameplayFeed,
  ): Promise<IDungeonGameplayState> {
    const lib = GameLogicLibraryFactory.create();
    (new UiModule(lib.entityService)).initialize();
    this._initializeCommands(lib);

    const turnBasedGameplayModule = new TurnBasedGameplayModule(lib.eventService).initialize();
    const actorModule = new ActorModule(dataFeed, lib.entityService, lib.actionService, lib.selectorService, lib.eventService).initialize();
    const boardModule = new BoardModule(lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.eventService).initialize();
    const effectModule = new EffectsModule(lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.modifierService, lib.eventService).initialize();
    const questModule = new QuestModule(dataFeed, lib.entityService, lib.eventService, lib.conditionsService, lib.activityService).initialize();
    const abilityModule = new AbilityModule(dataFeed, lib.entityService, lib.actionService, lib.modifierService, lib.selectorService).initialize();
    const tradeModule = new VendorsModule(lib.entityService, lib.activityService).initialize();
    const rewardsModule = new RewardModule(lib.entityService, lib.actionService, lib.modifierService, lib.eventService, lib.activityService).initialize();

    lib.entityService.hydrate(state);

    this._initializePlayers(state)


    return await lib.mixinFactory.create(state) as unknown as IDungeonGameplayState;
  }

  private _initializeCommands(lib: ReturnType<typeof GameLogicLibraryFactory.create>) {
    lib.entityService.useFactories([
      new CastEffectCommand(),
    ])
  }

  private _initializePlayers(stateDto: IDungeonStateDeclaration): void {
    // stateDto.players = stateDto.players.map(p => {
    //   if (p.playerType === PlayerType.Human) {
    //    return 
    //   }
    // })
  }

}
