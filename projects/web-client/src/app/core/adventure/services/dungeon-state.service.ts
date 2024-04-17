import { Injectable } from "@angular/core";
import { GameLogicLibraryFactory } from "@game-logic/lib";
import { MediaModule } from "../../game-ui/media.module";
import { ActorModule } from "@game-logic/lib/modules/actors/actors.module";
import { EffectsModule } from "@game-logic/lib/modules/effects/effects.module";
import { QuestModule } from "@game-logic/lib/modules/quest/quest.module";
import { VendorsModule } from "@game-logic/lib/modules/vendors/vendors.module";
import { AdventureGameplay } from "../state/adventure.gameplay";
import { DungeonModule } from "@game-logic/gameplay/modules/dungeon/dungeon.module";
import { AreasModule } from "@game-logic/lib/modules/areas/areas.module";
import { ContinuousGameplayModule } from "@game-logic/lib/modules/continuous-gameplay/continuous-gameplay.module";
import { EnterDungeonCommand } from "../commands/enter-dungeon.command";
import { RoutingService } from "src/app/aspects/navigation/api";
import { IAdventureGameplayStateDto, IAdventureGameplayFeed } from "@game-logic/gameplay/state/adventure/adventure-gameplay.interface";

@Injectable()
export class AdventureStateService {

  constructor(
    private readonly _routingService: RoutingService
  ) { }

  public async initializeAdventureGameplay(
    stateDto: IAdventureGameplayStateDto,
    dataFeed: IAdventureGameplayFeed,
  ) {
    const lib = GameLogicLibraryFactory.create();
    (new MediaModule(lib.entityService)).initialize();
    this._initializeCommands(lib);

    const continousGameplay = new ContinuousGameplayModule().initialize()
    const actorModule = new ActorModule(dataFeed, lib.entityService, lib.actionService, lib.selectorService, lib.eventService).initialize();
    const effectModule = new EffectsModule(lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.modifierService, lib.eventService).initialize();
    const questModule = new QuestModule(dataFeed, lib.entityService, lib.eventService, lib.conditionsService, lib.activityService).initialize();
    const tradeModule = new VendorsModule(lib.entityService, lib.activityService).initialize();
    const areaModule = new AreasModule(lib.entityService, lib.actionService, lib.eventService, lib.activityService).initialize();
    const dungeonModule = new DungeonModule(lib.entityService, areaModule.areasService).initialize();

    lib.entityService.hydrate(stateDto);

    return new AdventureGameplay(
      lib.entityService,
      continousGameplay.continuousService,
      actorModule.actorSevice,
      questModule.questService,
      areaModule.areasService,
      tradeModule.tradeService,
      effectModule.effectService,
      dungeonModule.dungeonService
    );
  }

  private _initializeCommands(lib: ReturnType<typeof GameLogicLibraryFactory.create>) {
    lib.entityService.useFactories([
      new EnterDungeonCommand(this._routingService),
    ])
  }

}
