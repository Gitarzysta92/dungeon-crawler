import { Injectable } from "@angular/core";
import { GameLogicLibraryFactory } from "@game-logic/lib";
import { MediaModule } from "../../game-ui/media.module";
import { ActorModule } from "@game-logic/lib/modules/actors/actors.module";
import { GameBuilderState } from "../state/game-builder.state";
import { IGameBuilderStateDto } from "../state/game-builder-state.interface";
import { DataFeedService } from "../../data/services/data-feed.service";
import { AbilityModule } from "@game-logic/lib/modules/abilities/abilities.module";
import { PerksModule } from "@game-logic/lib/modules/perks/perks.module";
import { ItemsModule } from "@game-logic/lib/modules/items/items.module";

@Injectable()
export class GameBuilderStateService {

  constructor( ) { }

  public async initializeState(
    stateDto: IGameBuilderStateDto,
    dataFeed: DataFeedService,
  ) {
    const lib = GameLogicLibraryFactory.create();

    new ActorModule(dataFeed, lib.entityService, lib.actionService, lib.selectorService, lib.eventService).initialize();
    new MediaModule(lib.entityService).initialize();
    new AbilityModule(dataFeed, lib.entityService, lib.actionService, lib.modifierService, lib.selectorService).initialize();
    new PerksModule(lib.entityService, lib.actionService, lib.activityService, lib.conditionsService).initialize();
    new ItemsModule(dataFeed, lib.entityService, lib.actionService, lib.selectorService, lib.activityService).initialize();

    stateDto.hero = await lib.mixinFactory.create(stateDto.hero);
    return new GameBuilderState(stateDto);
  }

}
