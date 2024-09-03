import { DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry, RepeatWrapping, Sprite, SpriteMaterial, Vector3 } from "three";
import { IRawVector3 } from "../../extensions/types/raw-vector3";
import { IAssetsProvider } from "../../assets/assets.interface";
import { AnimatableSprite } from "../../animations/sprite-animator";
import { ActorsManager } from "../../actors/actors-manager";
import { AnimationService } from "../../animations/animation.service";
import { AnimationTask } from "../../animations/animation.task";
import { IAnimatable } from "../../animations/animations.interface";
import { Easing, Tween } from "@tweenjs/tween.js";

export interface IAnimationDeclaration {
  declarationName: string;
  from: IRawVector3
  to: IRawVector3
}

export class AnimationPlayerComponent {
  public sprite!: AnimatableSprite

  constructor(
    private readonly _assetLoader: IAssetsProvider,
    private readonly _actorManager: ActorsManager,
    private readonly _animationService: AnimationService
  ) {

  }

  public async playAnimation2() {
    const to = { x: 0, y:0.5, z: 0 }
    const texture2 = await this._assetLoader.loadAsync({ fileName: 'explosion', ext: 'png' })
    texture2.wrapS = texture2.wrapT = RepeatWrapping;
		texture2.repeat.set(1 / 7, 1);
    const spriteMaterial = new SpriteMaterial({ map: texture2 })
    const sprite = new Sprite(spriteMaterial);
    const animatableSprite = new AnimatableSprite(7, 1, sprite);
    sprite.position.set(to.x, to.y, to.z);
    sprite.scale.set(2,2,2)
    this._actorManager.addObject(sprite)

    while (true) {
      await new Promise(r => setTimeout(r, 50))
      animatableSprite.nextFrame();
    }


    // const animationTask2 = new SpriteAnimation(
    //   new AnimatableSprite(7, 1, sprite),
    //   false,
    //   from,
    //   to,
    //   p => {
    //     // plane.position.setX(p.x),
    //     // plane.position.setZ(p.z)
    //   }, 
    // );
  }

  public async playAnimation(from: IRawVector3, to: IRawVector3) {
    const texture = await this._assetLoader.loadAsync({ fileName: 'fireball', ext: 'png' });
    texture.wrapS = texture.wrapT = RepeatWrapping;
		texture.repeat.set(0.75 / 10, 0.75);
		texture.offset.y = 0.2
    const texture2 = await this._assetLoader.loadAsync({ fileName: 'explosion', ext: 'png' })
    texture2.wrapS = texture2.wrapT = RepeatWrapping;
		texture2.repeat.set(1 / 7, 1);

    const target = { x: (from.x * -1) + to.x, z: (from.z * -1) + to.z } 
    const angle = Math.atan2(target.x, target.z)

    if (isNaN(angle)) {
      return;
    }

    console.log(angle);

    const geometry = new PlaneGeometry( 1, 1 );
    const material = new MeshBasicMaterial( { map: texture, transparent: true } );
    const plane = new Mesh(geometry, material);
    plane.rotateX(-Math.PI / 2)
    plane.position.setY(0.5);
    plane.rotateZ(angle + (Math.PI/2))
    this._actorManager.addObject( plane );




    const spriteMaterial = new SpriteMaterial({ map: texture2 })
    const sprite = new Sprite(spriteMaterial);
    sprite.position.set(to.x, 0.5, to.z);
    sprite.scale.set(2,2,2)
    const animatableSprite = new AnimatableSprite(7, 1, sprite);




    const animateSecond = async () => {
      this._actorManager.addObject(sprite)
      while (true) {
        await new Promise(r => setTimeout(r, 50))
        animatableSprite.nextFrame();
      }
    }



    let isSecondAnimationStarted = false;
    const animationTask = new SpriteAnimation(
      new AnimatableSprite(10, 1, plane),
      false,
      from,
      to,
      (p, e) => {
        if (!isSecondAnimationStarted && e > 0.5) {
          isSecondAnimationStarted = true;
          animateSecond()
        }

        plane.position.setX(p.x),
        plane.position.setZ(p.z)
      }, 
    );

    await this._animationService.animate(animationTask);
    this._actorManager.removeObject(plane);
    this._actorManager.removeObject(sprite);

  }



}






export class SpriteAnimation extends AnimationTask<IAnimatable> {
  private _tween: Tween<{}> | undefined;

  constructor(
    public readonly sprite: AnimatableSprite,
    public readonly isBlocking: boolean,
    public readonly from: { x: number, z: number },
    public readonly to: { x: number, z: number },
    private readonly _cb: (p: { x: number, z: number }, e: number) => void, 
  ) {
    super(sprite);
  }

  public initialize(): void {
    this._tween = new Tween(this.from, false)
      .to(this.to, 500)
      .easing(Easing.Cubic.Out)
      .onUpdate((p, e) => this._cb(p, e))
  }

  public perform(s: { time: number, deltaT: number }): void {
    if (!this._tween?.isPlaying()) {
      this._tween?.start(s.time);
    }
    this.sprite.nextFrame();
    if (!this._tween?.update(s.time)) {
      this.finish();
    }
  }

}