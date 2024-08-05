import { Mesh, CylinderGeometry, Group, MeshPhongMaterial, Vector3, Color } from "three";
import { IDraggable } from "../../../../behaviors/draggable/draggable.interface";
import { IAnimatable } from "../../../../animations/animations.interface";
import { TokenBase } from "../common/token-base.game-object";
import { AnimationService } from "../../../../animations/animation.service";
import { Rotatable } from "../../../../behaviors/rotatable/rotatable.mixin";
import { Movable } from "../../../../behaviors/movable/movable.mixin";
import { Hoverable } from "../../../../behaviors/hoverable/hoverable.mixin";
import { Selectable } from "../../../../behaviors/selectable/selectable.mixin";
import { Highlightable } from "../../../../behaviors/highlightable/highlightable.mixin";
import { ROTATION_ANGLES } from "../../../../behaviors/rotatable/rotatable.constants";
import { IActorDefinition } from "../../../actor.interface";
import { StrategyStackV2 } from "../../../../utils/strategy-stack/strategy-stack";
import { IAssignable } from "../../fields/common/field.interface";
import { IPlainTileDefinition } from "./plain-tile.interface";
import { OutletHolder } from "../common/outlets.mixin";
import { TweenAnimation } from "../../../../animations/tween-animation.task";
import { IRawVector3 } from "../../../../extensions/types/raw-vector3";
import * as TWEEN from '@tweenjs/tween.js';

export class PlainTile
  extends Hoverable.mixin(Selectable.mixin(Rotatable.mixin(Movable.mixin(Highlightable.mixin(OutletHolder.mixin(TokenBase))))))
  implements IDraggable, IAnimatable {
  public get animationSubject() { return this._object }
  
  private _initialOutlets: (keyof typeof ROTATION_ANGLES)[] = [];
  private _initialYOffset: number = 5;
  _strategyStack: StrategyStackV2;
  _hoverStrategyItem: () => void;
  _selectStrategyItem: () => void;
  _highlightStrategyItem: () => void;
  _outletMeshProvider: () => Group;
  get _holder() { return this._object };

  constructor(
    def: IPlainTileDefinition & IActorDefinition & IAssignable,
    outletMeshProvider: () => Group,
    protected readonly _object: Mesh<CylinderGeometry, MeshPhongMaterial>,
    private readonly _animationService: AnimationService
  ) {
    super(def);
    this._initialOutlets = def.outlets;
    const defaultColor = (this.object as any).material.color;
    const hoverColor = new Color("#aa7600");
    const selectColor = new Color("#7e1cdb");
    const highlightColor = new Color("#ff0c00");

    const defaultD = () => (this.object as any).material.color = defaultColor
    this._hoverStrategyItem = () => (this.object as any).material.color = hoverColor;
    this._selectStrategyItem = () => (this.object as any).material.color = selectColor;
    this._highlightStrategyItem = () => (this.object as any).material.color = highlightColor;
    this._strategyStack = new StrategyStackV2(defaultD);
    this.takenFieldId = def.takenFieldId;
    this._outletMeshProvider = outletMeshProvider;
  }

  public init(): Mesh {
    this._object.castShadow = true;
    this._object.receiveShadow = false;
    const mesh = super.init();
    this.updateOutlets(this._initialOutlets)
    return mesh as Mesh;   
  }

  public afterEnteringScene(targetPosition: Vector3, delay?: number): Promise<void> {
    const initialPosition = new Vector3(targetPosition.x, targetPosition.y + this._initialYOffset, targetPosition.z);
    this.setPosition(initialPosition, true);
    const animation = this._setupInitialAnimation(initialPosition, targetPosition, delay);
    return this._animationService.animate(animation);
  }

  private _setupInitialAnimation(ip: IRawVector3, tp: IRawVector3, delay?: number): TweenAnimation<typeof this, IRawVector3 & { opacity: number }> {
    //this._object.material.opacity = 0;
    //this._object.material.transparent = true;
    const animation = new TweenAnimation<typeof this, IRawVector3 & { opacity: number }>(
      this,
      { from: Object.assign({ opacity: 0 }, ip), to: Object.assign({ opacity: 1 }, tp), animationTime: 1000, delay: delay },
      TWEEN.Easing.Exponential.Out,
      p => {
        this._object.position.setY(p.y);
        //this._object.material.opacity = p.opacity;
      }, 
      true
    );
    //animation.onFinish(() => this._object.material.transparent = false);
    return animation;
  }
}
