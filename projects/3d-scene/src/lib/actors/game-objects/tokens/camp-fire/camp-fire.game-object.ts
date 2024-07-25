import { Mesh, PlaneGeometry, MeshStandardMaterial, Vector3 } from "three";
import { TokenBase } from "../common/token-base.game-object";
import { Rotatable } from "../../../../behaviors/rotatable/rotatable.mixin";
import * as TWEEN from '@tweenjs/tween.js';
import { IAnimatable } from "../../../../animations/animations.interface";
import { TweenAnimation } from "../../../../animations/tween-animation.task";
import { IRawVector3 } from "../../../../extensions/types/raw-vector3";
import { IAfterEnteredScene } from "../../../actor-lifecycle.interface";
import { AnimationService } from "../../../../animations/animation.service";

export class CampFireObject
  extends Rotatable.mixin(TokenBase)
  implements IAfterEnteredScene, IAnimatable {
  
  public get animationSubject() { return this._object };

  protected _object!: Mesh<PlaneGeometry, MeshStandardMaterial>;
  private _initialYOffset: number = 5;

  constructor(
    def: { auxId: string, auxCoords: string },
    mesh: any,
    private readonly _animationService: AnimationService
  ) {
    super(def);
    this._object = mesh;
  }

  public init(): Mesh<PlaneGeometry, MeshStandardMaterial> {
    //this._object.castShadow = true;
    this._object.receiveShadow = true;

    const mesh = super.init();
    return mesh as Mesh<PlaneGeometry, MeshStandardMaterial>;
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