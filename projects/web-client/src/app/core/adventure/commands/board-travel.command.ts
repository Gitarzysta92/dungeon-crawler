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
import { IAdventureGameplayState } from "../interfaces/adventure-gameplay-state.interface";


export class BoardTravelCommandFactory implements IMixinFactory<ICommand> {

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _boardAreaService: BoardAreaService
  ) {}
  
  public validate(a: IBoardTravelActivity & ICommand): boolean {
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

      public async indicate(state: IAdventureGameplayState): Promise<void> {
        const pawn = state.getSelectedPawn();
        const path = boardAreaService.getConnection(pawn.occupiedArea, this.area);
        sceneService.components.board2Component
          .showPathIndicators(path.segments.map(s => ({
            isOrigin: s.isOrigin,
            isDestination: s.isDestination,
            position: mapCubeCoordsTo3dCoords(s.position)
          })));
      }

      public async execute(adventureStateStore: AdventureStateStore): Promise<void> {
        const abandonTransaction = adventureStateStore.startTransaction();
        const pawn = adventureStateStore.currentState.getSelectedPawn();
        try {
          for await (let segment of super.perform2(pawn)) {
            sceneService.components.board2Component
              .hidePathIndicators(mapCubeCoordsTo3dCoords(segment.from), mapCubeCoordsTo3dCoords(segment.to));
            await pawn.updateScenePosition();
          }
        } catch (e) {
          abandonTransaction();
          sceneService.components.board2Component.hidePathIndicators()
          throw e;
        }
        adventureStateStore.setState(adventureStateStore.currentState);
      }
    }
    return BoardTravelCommand;
  }
}
