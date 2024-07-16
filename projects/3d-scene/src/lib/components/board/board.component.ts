import { ActorsManager } from "../../actors/actors-manager";
import { HoveringService } from "../../behaviors/hoverable/hovering.service";
import { SceneComposer } from "../../helpers/scene-composer/scene-composer";
import { ISceneComposerHandler } from "../../helpers/scene-composer/scene-composer.interface";
import { PointerHandler } from "../../interactions/pointer/pointer-handler";
import { boardComposerDefinitionName } from "./board.constants";
import { IBoardComposerDefinition } from "./board.interface";
import { hexagonalPlainsFieldComposerDefinitionName } from "../../actors/game-objects/terrains/hexagonal-plains/hexagonal-plains.constants";
import { HexagonalPlainsObject } from "../../actors/game-objects/terrains/hexagonal-plains/hexagonal-plains.game-object";
import { Matrix4, Vector3,  Vector2, LineBasicMaterial, BufferGeometry, Line } from "three";
import { AnimationService } from "../../animations/animation.service";
import { IActor } from "../../actors/actor.interface";
import { IHexagonalPlainsFieldDefinition } from "../../actors/game-objects/terrains/hexagonal-plains/hexagonal-plains.interface";
import { IRawVector3 } from "../../extensions/types/raw-vector3";
import { getNormalizedCoordinates } from "../../utils/utils";
import { Observable, filter } from "rxjs";
import { Group } from "@tweenjs/tween.js";


export class BoardComponent implements
  ISceneComposerHandler<typeof boardComposerDefinitionName | typeof hexagonalPlainsFieldComposerDefinitionName, IBoardComposerDefinition> {
  initializeFieldHovering() {
    throw new Error('Method not implemented.');
  }

  definitionName = boardComposerDefinitionName;
  
  constructor(
    private readonly _actorsManager: ActorsManager,
    private readonly _pointerHandler: PointerHandler,
    private readonly _hoverDispatcher: HoveringService,
    private readonly _sceneComposer: SceneComposer,
    private readonly _animationService: AnimationService,
  ) {  }

  public validateComposer(defName: string): boolean {
    return defName === this.definitionName;
  }

  public async compose(def: IBoardComposerDefinition | IHexagonalPlainsFieldDefinition): Promise<void> { 

    def.isHandled = true;
  }

}