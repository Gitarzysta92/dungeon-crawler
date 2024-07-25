import { Mesh, Vector3, BufferGeometry, MeshLambertMaterial } from "three";
import { ActorBase } from "../../../actor-base";
import { IAfterEnteredScene } from "../../../actor-lifecycle.interface";
import { IAnimatable } from "../../../../animations/animations.interface";
import { AnimationService } from "../../../../animations/animation.service";
import * as TWEEN from '@tweenjs/tween.js'
import { TweenAnimation } from "../../../../animations/tween-animation.task";
import { IRawVector3 } from "../../../../extensions/types/raw-vector3";


export class FloatingRockTerrainObject extends ActorBase implements IAfterEnteredScene, IAnimatable {

  protected _object!: Mesh<BufferGeometry, MeshLambertMaterial>;
  public get object() { return this._object };
  public get animationSubject() { return this._object };

  private _initialYOffset: number = -5;

  constructor(
    public readonly mesh: Mesh<BufferGeometry, MeshLambertMaterial>,
    private readonly _animationService: AnimationService
  ) {
    super({ auxId: "", auxCoords: "" });
    this._object = mesh;
  }

  public init(): Mesh<BufferGeometry, MeshLambertMaterial> {
    //this._object.castShadow = true;
    this._object.receiveShadow = true;

    const mesh = super.init();
    return mesh as Mesh<BufferGeometry, MeshLambertMaterial>;
  }

  public afterEnteringScene(targetPosition: Vector3): Promise<void> {
    const initialPosition = new Vector3(targetPosition.x, targetPosition.y + this._initialYOffset, targetPosition.z);
    this.setPosition(initialPosition, true);
    const animation = this._setupInitialAnimation(initialPosition, targetPosition);
    return this._animationService.animate(animation);
  }

  private _setupInitialAnimation(ip: IRawVector3, tp: IRawVector3): TweenAnimation<typeof this, IRawVector3 & { opacity: number }> {
    //this.object.material.opacity = 0;
    //this.object.material.transparent = true;
    const animation = new TweenAnimation<typeof this, IRawVector3 & { opacity: number }>(
      this,
      { from: Object.assign({ opacity: 0 }, ip), to: Object.assign({ opacity: 1 }, tp), animationTime: 1000 },
      TWEEN.Easing.Exponential.Out,
      p => {
        this.object.position.setY(p.y);
        //this.object.material.opacity = p.opacity;
      }, 
      true
    );
    //animation.onFinish(() => this.object.material.transparent = false);
    return animation;
  }

  public clone() {
    return this;
  }
}