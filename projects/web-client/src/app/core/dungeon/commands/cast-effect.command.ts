import { DungeonStateStore } from "../stores/dungeon-state.store";
import { IMixinFactory } from "@game-logic/lib/infrastructure/mixin/mixin.interface";
import { Constructor } from "@game-logic/lib/infrastructure/extensions/types";
import { ICommand } from "../../game/interfaces/command.interface";

import { NotEnumerable } from "@game-logic/lib/infrastructure/extensions/object-traverser";



export class CastEffectCommand implements IMixinFactory<any> {

  constructor() {}
  
  validate(a: ICommand): boolean {
    return a.isActivity && a.id === ""
  }

  create(e: Constructor<ICommand>): Constructor<ICommand> {
    class Command extends e implements ICommand {

      @NotEnumerable()
      public isCastEffectCommand = true as const;
      
      constructor(d: unknown) {
        super(d);
      }

      public async indicate(adventureStateStore: DungeonStateStore): Promise<void> {
        // this.subject as .bearer


        // const pawn = adventureStateStore.currentState.getSelectedPawn();
        // const path = boardAreaService.getConnection(pawn.occupiedArea, this.area);
        // sceneService.components.
        //   pathIndicator.showPathIndicators(path.segments.map(s => ({
        //     isOrigin: s.isOrigin,
        //     isDestination: s.isDestination,
        //     position: HexagonHelper.calculatePositionInGrid(mapCubeCoordsTo3dCoords(s.position), HEXAGON_RADIUS)
        //   })));
      }

      public async execute(adventureStateStore: DungeonStateStore): Promise<void> {
        // const effect = this.clone()
        // const process = effect.initializeCastingProcess(caster);
        // process.onBeforeDataGathered(async () => null)
        // process.onAfterDataGathered(async () => null)
        
        // await process.gatherData();
        

        // const abandonTransaction = adventureStateStore.startTransaction();
        // const pawn = adventureStateStore.currentState.getSelectedPawn();
        // try {
        //   for await (let segment of super.perform2(pawn)) {
        //     sceneService.components.pathIndicator
        //       .hidePathIndicators(mapCubeCoordsTo3dCoords(segment.from), mapCubeCoordsTo3dCoords(segment.to));
        //     await pawn.updateScenePosition();
        //     adventureStateStore.setState(adventureStateStore.currentState);
        //   }
        // } catch (e) {
        //   abandonTransaction();
        //   sceneService.components.pathIndicator.hidePathIndicators()
        //   throw e;
        // }
      }

    }
    return Command;
  }
}