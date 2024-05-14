import { ActivityService } from "../../../lib/base/activity/activity.service";
import { EntityService } from "../../../lib/base/entity/entity.service";
import { EventService } from "../../../lib/cross-cutting/event/event.service";
import { PathfindingService } from "../../../lib/modules/board/pathfinding/pathfinding.service";
import { BoardTravelActivityFactory } from "./activities/travel/travel.activity";
import { BoardAreaService } from "./board-area.service";
import { BoardAreaFactory } from "./entities/board-area/board-area.factory";
import { BoardAreaResidentFactory } from "./entities/board-resident/resident.factory";
import { BoardTravelerFactory } from "./entities/board-traveler/board-traveler.factory";

export class BoardAreasModule {
  constructor(
    private readonly _entityService: EntityService,
    private readonly _eventService: EventService,
    private readonly _activityService: ActivityService,
    private readonly _pathfindingService: PathfindingService
  ) { }
  
  public initialize() {
    const boardAreasService = new BoardAreaService(this._entityService, this._pathfindingService);

    this._entityService.useFactories([
      new BoardAreaFactory(this._eventService, boardAreasService),
      new BoardAreaResidentFactory(),
      new BoardTravelerFactory(boardAreasService)
    ]);

    this._activityService.useFactories([
      new BoardTravelActivityFactory(boardAreasService)
    ])

    return {
      areasService: boardAreasService
    }
  }
}