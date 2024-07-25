import { Mesh, CylinderGeometry, Group, Vector3, Color } from "three";
import { IDraggable } from "../../../../behaviors/draggable/draggable.interface";
import { IAnimatable } from "../../../../animations/animations.interface";
import { ICommonTileDefinition } from "./common-tile.interface";
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
import { OutletHolder } from "../common/outlets.mixin";
import { TweenAnimation } from "../../../../animations/tween-animation.task";
import { IRawVector3 } from "../../../../extensions/types/raw-vector3";
import * as TWEEN from '@tweenjs/tween.js';

export class CommonTile
  extends Hoverable.mixin(Selectable.mixin(Rotatable.mixin(Movable.mixin(Highlightable.mixin(OutletHolder.mixin(TokenBase))))))
  implements IDraggable, IAnimatable {
  public get animationSubject() { return this._object }
  get _holder() { return this._object }

  private _initialOutlets: (keyof typeof ROTATION_ANGLES)[] = [];
  private _initialYOffset: number = 5;
  _strategyStack: StrategyStackV2;
  _hoverStrategyItem: () => void;
  _selectStrategyItem: () => void;
  _highlightStrategyItem: () => void;
  _outletMeshProvider: () => Group;

  constructor(
    def: ICommonTileDefinition & IActorDefinition,
    outletMeshProvider: () => Group,
    protected readonly _object: Mesh<CylinderGeometry, any>,
    private readonly _animationService: AnimationService,
  ) {
    super(def);
    this.def = def;
    this._initialOutlets = def.outlets;
    const defaultColor = new Color("#000000");
    const hoverColor = new Color("#aa7600");
    const selectColor = new Color("#7e1cdb");
    const highlightColor = new Color("#5dc327");

    const defaultD = () => this.mesh.material.color = defaultColor;
    this._hoverStrategyItem = () => this.mesh.material.color = hoverColor;
    this._selectStrategyItem = () => this.mesh.material.color = selectColor;
    this._highlightStrategyItem = () => this.mesh.material.color = highlightColor;
    this._strategyStack = new StrategyStackV2(defaultD);
    this._outletMeshProvider = outletMeshProvider;
  }

  public init(): Mesh {
    this._object.castShadow = true;
    this._object.receiveShadow = false;
    const mesh = super.init();
    this.updateOutlets(this._initialOutlets)
    return mesh as Mesh;   
  }

  public clone() {
    return new CommonTile(this.def, this._outletMeshProvider, this._object.clone(true), this._animationService);
  }

  public afterEnteringScene(targetPosition: Vector3, delay?: number): Promise<void> {
    const initialPosition = new Vector3(targetPosition.x, targetPosition.y + this._initialYOffset, targetPosition.z);
    this.setPosition(initialPosition, true);
    const animation = this._setupInitialAnimation(initialPosition, targetPosition, delay);
    return this._animationService.animate(animation);
  }

  public async moveAsync(p: IRawVector3): Promise<void> {
    if (!this.validateMove(p)) {
      return;
    }
    const moveAnimation = new TweenAnimation<typeof this, IRawVector3>(
      this,
      { from: this.object.position.clone(), to: p, animationTime: 1000 },
      TWEEN.Easing.Quartic.InOut,
      p => {
        this._object.position.setX(p.x),
        this._object.position.setZ(p.z)
      }, 
      true
    );
    await this._animationService.animate(moveAnimation);
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
