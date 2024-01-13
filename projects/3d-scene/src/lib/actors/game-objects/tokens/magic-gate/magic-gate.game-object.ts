import { Mesh, PlaneGeometry, MeshLambertMaterial, ShaderMaterial, BufferGeometry, PointLight, Group, Object3D, Vector3 } from "three";
import { TokenBase } from "../common/token-base.game-object";
import { IActorDefinition } from "../../../actor.interface";
import { Rotatable } from "../../../../behaviors/rotatable/rotatable.mixin";
import { IAnimatable } from "../../../../animations/animations.interface";
import { TweenAnimation } from "../../../../animations/tween-animation.task";
import { IRawVector3 } from "../../../../extensions/types/raw-vector3";
import { IAfterActorEnteringScene } from "../../../actor-lifecycle.interface";
import { AnimationService } from "../../../../animations/animation.service";
import * as TWEEN from '@tweenjs/tween.js'

export class MagicGate
  extends Rotatable.mixin(TokenBase)
  implements IAfterActorEnteringScene, IAnimatable {
  public group = new Group();
  public get animationSubject() { return this._mesh };

  protected get _object() { return this.group as any }
  private _performaceTimestampFraction = 0.001
  private _initialYOffset: number = 5;

  constructor(
    def: IActorDefinition,
    private readonly _mesh: Mesh<BufferGeometry, MeshLambertMaterial>,
    private readonly _teleportFirstLayer: Mesh<PlaneGeometry, ShaderMaterial>,
    private readonly _teleportSecondLayer: Mesh<PlaneGeometry, MeshLambertMaterial>,
    private readonly _light: PointLight,
    private readonly _boulders: Mesh<BufferGeometry, MeshLambertMaterial>,
    private readonly _animationService: AnimationService
  ) {
    super(def.auxId);
  }

  public init(): Object3D {
    this._mesh.add(this._teleportFirstLayer);
    this._mesh.add(this._teleportSecondLayer);
    this._mesh.add(this._light);
    this.group.add(this._boulders);
    this.group.add(this._mesh);
    return this.group;
  }
  
  public recalculate() {
    this._teleportFirstLayer.material.uniforms.iTime.value = performance.now() * this._performaceTimestampFraction;
  }

  public afterEnteringScene(targetPosition: Vector3, delay?: number): Promise<void> {
    const initialPosition = new Vector3(targetPosition.x, targetPosition.y + this._initialYOffset, targetPosition.z);
    this.setPosition(initialPosition, true);
    const animation = this._setupInitialAnimation(initialPosition, targetPosition, delay);
    return this._animationService.animate(animation);
  }

  private _setupInitialAnimation(ip: IRawVector3, tp: IRawVector3, delay?: number): TweenAnimation<typeof this, IRawVector3 & { opacity: number }> {
    this._object.opacity = 0;
    this._object.transparent = true;
    const animation = new TweenAnimation<typeof this, IRawVector3 & { opacity: number }>(
      this,
      { from: Object.assign({ opacity: 0 }, ip), to: Object.assign({ opacity: 1 }, tp), animationTime: 1000, delay: delay },
      TWEEN.Easing.Exponential.Out,
      p => {
        this._object.position.setY(p.y);
        this._object.opacity = p.opacity;
      }, 
      true
    );
    animation.onFinish(() => this._object.transparent = false);
    return animation;
  }

  public update(): void {
    this.object.updateMatrix();
    this.object.updateMatrixWorld();
    this._light.shadow.needsUpdate = true;
  } 
}