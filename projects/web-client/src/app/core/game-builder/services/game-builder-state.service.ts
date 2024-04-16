import { Injectable } from "@angular/core";
import { GameLogicLibraryFactory } from "@game-logic/lib";
import { GameUiModule } from "../../game-ui/game-ui.module";
import { ActorModule } from "@game-logic/lib/modules/actors/actors.module";
import { RoutingService } from "src/app/aspects/navigation/api";
import { GameBuilderState } from "../state/game-builder.state";
import { IGameBuilderStateDto } from "../state/game-builder-state.interface";
import { DataFeedService } from "../../data/services/data-feed.service";

@Injectable()
export class GameBuilderStateService {

  constructor(
    private readonly _routingService: RoutingService
  ) { }

  public async initializeState(
    stateDto: IGameBuilderStateDto,
    dataFeed: DataFeedService,
  ) {
    const lib = GameLogicLibraryFactory.create();
    (new GameUiModule(lib.entityService)).initialize();

    const actorModule = new ActorModule(dataFeed, lib.entityService, lib.actionService, lib.selectorService, lib.eventService).initialize();

    //lib.entityService.hydrate(stateDto);

    return new GameBuilderState(

    );
  }

}
