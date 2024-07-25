import { BOARD_TRAVEL_ACTIVITY } from "@game-logic/gameplay/modules/board-areas/board-areas.constants";
import { AdventureStateStore } from "../stores/adventure-state.store";
import { ICommand } from "../../game/interfaces/command.interface";
import { SceneService } from "../../scene/services/scene.service";
import { IBoardTravelActivity } from "@game-logic/gameplay/modules/board-areas/activities/board-travel/board-travel.interface";
import { BoardAreaService } from "@game-logic/gameplay/modules/board-areas/board-area.service";
import { mapCubeCoordsTo3dCoords } from "../../scene/misc/coords-mappings";
import { IMixinFactory } from "@game-logic/lib/infrastructure/mixin/mixin.interface";
import { Constructor } from "@game-logic/lib/infrastructure/extensions/types";
import { NotEnumerable } from "@game-logic/lib/infrastructure/extensions/object-traverser";
import { HexagonHelper } from "../../scene/misc/hexagon.helper";
import { HEXAGON_RADIUS } from "../../scene/constants/hexagon.constants";
import { IBoardTraveler } from "@game-logic/gameplay/modules/board-areas/entities/board-traveler/board-traveler.interface";
import { ISceneMedium } from "../../scene/mixins/scene-medium/scene-medium.interface";


export class BoardTravelCommandFactory implements IMixinFactory<ICommand> {

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _boardAreaService: BoardAreaService
  ) {}
  
  public isApplicable(a: IBoardTravelActivity & ICommand): boolean {
    return a.isActivity && a.id === BOARD_TRAVEL_ACTIVITY
  }

  public create(e: Constructor<IBoardTravelActivity & ICommand>): Constructor<ICommand> {
    const sceneService = this._sceneService;
    const boardAreaService = this._boardAreaService;
    
    class BoardTravelCommand extends e implements ICommand {
      
      @NotEnumerable()
      isBoardTravelCommand = true as const;

      constructor(d: unknown) {
        super(d);
      }

      public async indicate(adventureStateStore: AdventureStateStore): Promise<void> {
        const pawn = adventureStateStore.currentState.getCurrentPlayerSelectedPawn<IBoardTraveler>();
        const path = boardAreaService.getConnection(pawn.occupiedArea, this.area);
        sceneService.components.
          pathIndicator.showPathIndicators(path.segments.map(s => ({
            isOrigin: s.isOrigin,
            isDestination: s.isDestination,
            position: HexagonHelper.calculatePositionInGrid(mapCubeCoordsTo3dCoords(s.position), HEXAGON_RADIUS)
          })));
      }

      public async execute(adventureStateStore: AdventureStateStore): Promise<void> {
        const abandonTransaction = adventureStateStore.startTransaction();
        const pawn = adventureStateStore.currentState.getCurrentPlayerSelectedPawn<IBoardTraveler & ISceneMedium>();
        try {
          for await (let segment of super.doActivity(pawn)) {
            sceneService.components.pathIndicator
              .hidePathIndicators(mapCubeCoordsTo3dCoords((segment as any).from), mapCubeCoordsTo3dCoords((segment as any).to));
            await pawn.updateScenePosition();
            adventureStateStore.setState(adventureStateStore.currentState);
          }
        } catch (e) {
          abandonTransaction();
          sceneService.components.pathIndicator.hidePathIndicators()
          throw e;
        }
      }
    }
    return BoardTravelCommand;
  }
}
