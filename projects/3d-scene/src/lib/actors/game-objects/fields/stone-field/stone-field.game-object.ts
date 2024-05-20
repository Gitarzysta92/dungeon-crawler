import { Mesh, MeshLambertMaterial, BufferGeometry, Vector3 } from "three";
import { IAnimatable } from "../../../../animations/animations.interface";
import { Hoverable } from "../../../../behaviors/hoverable/hoverable.mixin";
import { Selectable } from "../../../../behaviors/selectable/selectable.mixin";
import { FieldBase } from "../common/base-field.game-object";
import { StrategyStack, StrategyStackItem } from "../../../../utils/strategy-stack/strategy-stack";
import { IAfterActorEnteringScene } from "../../../actor-lifecycle.interface";
import { AnimationService } from "../../../../animations/animation.service";
import { TweenAnimation } from "../../../../animations/tween-animation.task";
import { IRawVector3 } from "../../../../extensions/types/raw-vector3";
import * as TWEEN from '@tweenjs/tween.js'

export class StoneFieldObject
  extends Hoverable.mixin(Selectable.mixin(FieldBase))
  implements IAnimatable, IAfterActorEnteringScene {
  
  public get animationSubject() { return this.mesh };
  
  _strategyStack: StrategyStack;
  _hoverStrategyItem: StrategyStackItem;
  _selectStrategyItem: StrategyStackItem;

  private _initialYOffset: number = 5;
  private _animation: TweenAnimation<this, IRawVector3 & { opacity: number; }> | undefined;

  constructor(
    def: { auxId: string, auxCoords: string },
    public mesh: Mesh<BufferGeometry, MeshLambertMaterial>,
    private readonly _animationService: AnimationService
  ) {
    super(def);
    this._strategyStack = new StrategyStack(new StrategyStackItem(() => null));
    this._hoverStrategyItem = new StrategyStackItem(() => null);
    this._selectStrategyItem = new StrategyStackItem(() => null);
  }

  public init(): Mesh<BufferGeometry, MeshLambertMaterial> {
    this._object.castShadow = true;
    this._object.receiveShadow = true;
    return this._object as Mesh<BufferGeometry, MeshLambertMaterial>;   
  }

  public afterEnteringScene(targetPosition: Vector3, delay?: number): Promise<void> {
    const initialPosition = new Vector3(targetPosition.x, targetPosition.y + this._initialYOffset, targetPosition.z);
    this.setPosition(initialPosition, true);
    this._animation = this._setupInitialAnimation(initialPosition, targetPosition, delay);
    return this._animationService.animate(this._animation);
  }

  private _setupInitialAnimation(ip: IRawVector3, tp: IRawVector3, delay?: number): TweenAnimation<typeof this, IRawVector3 & { opacity: number }> {
    this._object.material.opacity = 0;
    this._object.material.transparent = true;
    const animation = new TweenAnimation<typeof this, IRawVector3 & { opacity: number }>(
      this,
      { from: Object.assign({ opacity: 0 }, ip), to: Object.assign({ opacity: 1 }, tp), animationTime: 500, delay: delay },
      TWEEN.Easing.Exponential.Out,
      p => {
        this.object.position.setY(p.y);
        this._object.material.opacity = p.opacity;
      }, 
      true
    );
    animation.onFinish(() => this._object.material.transparent = false);
    return animation;
  }
}
