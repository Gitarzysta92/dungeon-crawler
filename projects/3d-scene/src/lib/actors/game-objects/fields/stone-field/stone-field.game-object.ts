import { Mesh, MeshLambertMaterial, BufferGeometry, Vector3, Color } from "three";
import { IAnimatable } from "../../../../animations/animations.interface";
import { Hoverable } from "../../../../behaviors/hoverable/hoverable.mixin";
import { Selectable } from "../../../../behaviors/selectable/selectable.mixin";
import { FieldBase } from "../common/base-field.game-object";
import { StrategyStack, StrategyStackItem, StrategyStackV2 } from "../../../../utils/strategy-stack/strategy-stack";
import { IAfterEnteredScene } from "../../../actor-lifecycle.interface";
import { AnimationService } from "../../../../animations/animation.service";
import { TweenAnimation } from "../../../../animations/tween-animation.task";
import { IRawVector3 } from "../../../../extensions/types/raw-vector3";
import * as TWEEN from '@tweenjs/tween.js'
import { Highlightable } from "../../../../behaviors/highlightable/highlightable.mixin";

export class StoneFieldObject
  extends Hoverable.mixin(Selectable.mixin(Highlightable.mixin(FieldBase)))
  implements IAnimatable, IAfterEnteredScene {
  
  _strategyStack: StrategyStackV2;
  _hoverStrategyItem: () => void;
  _selectStrategyItem: () => void;
  _highlightStrategyItem: () => void;
  
  public get animationSubject() { return this.mesh };

  private _initialYOffset: number = 5;
  private _animation: TweenAnimation<this, IRawVector3 & { opacity: number; }> | undefined;

  constructor(
    def: { auxId: string, auxCoords: string },
    public mesh: Mesh<BufferGeometry, MeshLambertMaterial>,
    private readonly _animationService: AnimationService
  ) {
    super(def);
    const defaultColor = new Color(this.mesh.material.color);
    const hoverColor = new Color("#aa7600");
    const selectColor = new Color("#7e1cdb");
    const highlightColor = new Color("#5dc327");

    const defaultD = () => this.mesh.material.color = defaultColor;
    this._hoverStrategyItem = () => this.mesh.material.color = hoverColor;
    this._selectStrategyItem = () => this.mesh.material.color = selectColor;
    this._highlightStrategyItem = () => this.mesh.material.color = highlightColor;
    this._strategyStack = new StrategyStackV2(defaultD);
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
