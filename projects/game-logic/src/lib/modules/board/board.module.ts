import { EntityService } from "../../base/entity/entity.service";
import { ActionService } from "../../cross-cutting/action/action.service";
import { EventService } from "../../cross-cutting/event/event.service";
import { DataGatheringService } from "../../cross-cutting/gatherer/data-gathering-service";
import { SelectorService } from "../../cross-cutting/selector/selector.service";
import { ModifyPositionByPathActionHandler } from "./aspects/actions/modify-position-by-path.action";
import { MovePositionRelativeToHandler } from "./aspects/actions/move-position-relative-to.action";
import { PlaceOnBoardActionHandler } from "./aspects/actions/place-on-board.action";
import { BoardSelector } from "./aspects/selectors/board.selector";
import { BoardService } from "./board.service";
import { BoardFieldFactory } from "./entities/board-field/board-field.factory";
import { BoardObjectFactory } from "./entities/board-object/board-object.factory";
import { PathfindingService } from "./pathfinding/pathfinding.service";


export class BoardModule {
  constructor(
    private readonly _entityService: EntityService,
    private readonly _actionService: ActionService,
    private readonly _selectorService: SelectorService,
    private readonly _gathererService: DataGatheringService,
    private readonly _eventService: EventService
  ) { }
  
  public initialize() {
    const boardService = new BoardService(this._entityService, this._eventService);
    const pathfindingService = new PathfindingService();

    this._entityService.useFactories([
      new BoardFieldFactory(boardService),
      new BoardObjectFactory()
    ])

    // this._gathererService.register(new BoardFieldGatheringHandler(this._dataGatherer, this._selectorService));
    // this._gathererService.register(new PathGatheringHandler(this._dataGatherer, this._selectorService));
    // this._gathererService.register(new RotationGatheringHandler(this._dataGatherer, this._selectorService));

    this._actionService.register(new ModifyPositionByPathActionHandler(boardService));
    this._actionService.register(new MovePositionRelativeToHandler(pathfindingService, boardService));
    this._actionService.register(new PlaceOnBoardActionHandler());

    this._selectorService.register(new BoardSelector(boardService));

    return {
      boardService,
      pathfindingService
    }
  }
}