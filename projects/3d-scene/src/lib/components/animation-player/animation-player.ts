import { Camera, DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry, RepeatWrapping, Sprite, SpriteMaterial, Vector3, InstancedMesh, SphereGeometry, MeshStandardMaterial, Group, PointLight, Color, Matrix4, Quaternion } from "three";
import { IRawVector3 } from "../../extensions/types/raw-vector3";
import { IAssetsProvider } from "../../assets/assets.interface";
import { AnimatableSprite } from "../../animations/sprite-animator";
import { ActorsManager } from "../../actors/actors-manager";
import { AnimationService } from "../../animations/animation.service";
import { AnimationTask } from "../../animations/animation.task";
import { IAnimatable } from "../../animations/animations.interface";
import { Easing, Tween } from "@tweenjs/tween.js";
import { SceneWrapper } from "../../core/scene-wrapper";

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
    private readonly _animationService: AnimationService,
    private readonly _sceneWrapper: SceneWrapper
  ) {}

  public playCameraShake() {
    const x = new CameraShakeAnimation(this._sceneWrapper.camera)
    this._animationService.animate(x);
  }

  // Enhanced explosion particle system (default)
  private async createExplosionParticles(position: Vector3): Promise<void> {
    // Create multiple layers of particles for explosive effect
    const particleCount = 80; // High particle count for dramatic effect
    const geometry = new SphereGeometry(0.05, 8, 8); // Small particles for detail
    
    // Import fire explosion shaders
    const fireExplosionFragmentShader = await import('../../shaders/fire-explosion.fragment');
    const fireExplosionVertexShader = await import('../../shaders/fire-explosion.vertex');
    
    // Primary explosion particles (fire/embers) with custom shader
    const fireMaterial = new MeshStandardMaterial({
      color: new Color(0xff4400),
      emissive: new Color(0xff2200),
      emissiveIntensity: 3,
      transparent: true,
      opacity: 1
    });
    
    // Apply custom fire shader
    fireMaterial.onBeforeCompile = (shader) => {
      shader.fragmentShader = fireExplosionFragmentShader.default;
      shader.vertexShader = fireExplosionVertexShader.default;
      
      // Add uniforms for fire effect
      shader.uniforms.time = { value: 0 };
      shader.uniforms.intensity = { value: 1.0 };
      shader.uniforms.turbulence = { value: 0.5 };
      shader.uniforms.fireColor = { value: new Color(0xff4400) };
      shader.uniforms.smokeColor = { value: new Color(0x333333) };
      
      // Store shader reference for animation updates
      fireMaterial.userData.shader = shader;
    };
    
    const fireParticles = new InstancedMesh(geometry, fireMaterial, particleCount);
    fireParticles.position.copy(position);
    this._actorManager.addObject(fireParticles);

    // Secondary explosion particles (smoke/debris)
    const smokeMaterial = new MeshStandardMaterial({
      color: new Color(0x333333),
      transparent: true,
      opacity: 0.7
    });
    
    const smokeParticles = new InstancedMesh(geometry, smokeMaterial, particleCount);
    smokeParticles.position.copy(position);
    this._actorManager.addObject(smokeParticles);

    // Create explosion light
    const explosionLight = new PointLight(new Color(0xff4400), 5, 10);
    explosionLight.position.copy(position);
    explosionLight.position.y += 0.5;
    this._actorManager.addObject(explosionLight);

    // Create shockwave effect
    const shockwaveGeometry = new PlaneGeometry(0.1, 0.1);
    const shockwaveMaterial = new MeshBasicMaterial({
      color: new Color(0xffffff),
      transparent: true,
      opacity: 0.8
    });
    const shockwave = new Mesh(shockwaveGeometry, shockwaveMaterial);
    shockwave.position.copy(position);
    shockwave.position.y += 0.1;
    this._actorManager.addObject(shockwave);

    // Animate particles outward in explosion pattern
    const explosionAnimation = new ExplosionParticleAnimation(
      fireParticles, 
      smokeParticles, 
      explosionLight,
      shockwave,
      position,
      particleCount,
      this._actorManager
    );
    
    this._animationService.animate(explosionAnimation);
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
      
      // Create enhanced explosion particles (now the default)
      await this.createExplosionParticles(new Vector3(to.x, 0.5, to.z));
      
      // Enhanced explosion animation (30ms per frame for faster effect)
      while (true) {
        await new Promise(r => setTimeout(r, 30))
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
        // Trigger explosion at optimal timing for dramatic effect
        if (!isSecondAnimationStarted && e > 0.3) { // Early trigger for maximum impact
          isSecondAnimationStarted = true;
          animateSecond();
          this.playCameraShake();
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
      .to(this.to, 300) // Reduced from 500ms to 300ms for faster travel
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


export class CameraShakeAnimation extends AnimationTask<IAnimatable> {
  public isBlocking = false; 
  private _tween: Tween<{}> | undefined;

  constructor(
    public readonly camera: Camera, 
  ) {
    super({ animationSubject: camera as any });
  }

  public initialize(): void {
    const x = new Vector3();
    const z = new Vector3();
    x.copy(this.camera.position);
    x.setY(x.y - 0.5) // Increased shake intensity
    z.copy(this.camera.position);
    this._tween = new Tween(z, false)
      .to(x, 15) // Faster shake
      .repeat(4) // More repetitions for more dramatic effect
      .yoyo(true)
      .easing(Easing.Quartic.In)
      .onUpdate((p, e) => {
        this.camera.position.setY(p.y);
        // Add horizontal shake for more explosive feel
        this.camera.position.setX(p.x + (Math.random() - 0.5) * 0.1);
        this.camera.position.setZ(p.z + (Math.random() - 0.5) * 0.1);
      })
  }

  public perform(s: { time: number, deltaT: number }): void {
    if (!this._tween?.isPlaying()) {
      this._tween?.start(s.time);
    }
    if (!this._tween?.update(s.time)) {
      this.finish();
    }
  }

}

// Enhanced explosion particle animation class (default)
export class ExplosionParticleAnimation extends AnimationTask<IAnimatable> {
  public isBlocking: boolean = false;
  private _time: number = 0;
  private _duration: number = 2.0; // 2 seconds for full explosion
  private _matrix = new Matrix4();
  private _position = new Vector3();
  private _scale = new Vector3();
  private _quaternion = new Quaternion();

  constructor(
    private readonly fireParticles: InstancedMesh,
    private readonly smokeParticles: InstancedMesh,
    private readonly explosionLight: PointLight,
    private readonly shockwave: Mesh,
    private readonly explosionCenter: Vector3,
    private readonly particleCount: number,
    private readonly _actorManager: ActorsManager
  ) {
    super({ animationSubject: fireParticles as any });
  }

  public initialize(): void {
    // Initialize particle positions in a sphere around explosion center
    for (let i = 0; i < this.particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 0.1;
      
      const x = radius * Math.sin(phi) * Math.cos(angle);
      const y = radius * Math.sin(phi) * Math.sin(angle);
      const z = radius * Math.cos(phi);
      
      this._matrix.setPosition(x, y, z);
      this.fireParticles.setMatrixAt(i, this._matrix);
      this.smokeParticles.setMatrixAt(i, this._matrix);
    }
    
    this.fireParticles.instanceMatrix.needsUpdate = true;
    this.smokeParticles.instanceMatrix.needsUpdate = true;
  }

  public perform(s: { time: number, deltaT: number }): void {
    this._time += s.deltaT;
    const progress = this._time / this._duration;
    
    if (progress >= 1.0) {
      this.finish();
      return;
    }

    // Animate particles outward with explosion force
    for (let i = 0; i < this.particleCount; i++) {
      // Get current particle position
      this.fireParticles.getMatrixAt(i, this._matrix);
      this._matrix.decompose(this._position, this._quaternion, this._scale);
      
      // Calculate explosion force (stronger initial burst)
      const explosionForce = 3.0 * (1.0 - progress * 0.5); // Strong initial force
      const randomSpread = new Vector3(
        (Math.random() - 0.5) * 2,
        Math.random() * 2, // Upward bias
        (Math.random() - 0.5) * 2
      );
      
      // Apply explosion physics
      const newPosition = this._position.clone()
        .add(randomSpread.multiplyScalar(explosionForce * progress))
        .add(new Vector3(0, progress * 2, 0)); // Gravity effect
      
      // Scale particles based on progress
      const scale = 0.1 + progress * 0.5;
      
      this._matrix.setPosition(newPosition.x, newPosition.y, newPosition.z);
      this._matrix.scale(new Vector3(scale, scale, scale));
      
      this.fireParticles.setMatrixAt(i, this._matrix);
      this.smokeParticles.setMatrixAt(i, this._matrix);
    }
    
    // Update smoke particles with different behavior
    for (let i = 0; i < this.particleCount; i++) {
      this.smokeParticles.getMatrixAt(i, this._matrix);
      this._matrix.decompose(this._position, this._quaternion, this._scale);
      
      const smokeForce = 2.0 * (1.0 - progress * 0.3);
      const smokeSpread = new Vector3(
        (Math.random() - 0.5) * 1.5,
        Math.random() * 3, // More upward movement for smoke
        (Math.random() - 0.5) * 1.5
      );
      
      const newSmokePosition = this._position.clone()
        .add(smokeSpread.multiplyScalar(smokeForce * progress))
        .add(new Vector3(0, progress * 3, 0)); // Smoke rises more
      
      const smokeScale = 0.2 + progress * 1.0;
      
      this._matrix.setPosition(newSmokePosition.x, newSmokePosition.y, newSmokePosition.z);
      this._matrix.scale(new Vector3(smokeScale, smokeScale, smokeScale));
      
      this.smokeParticles.setMatrixAt(i, this._matrix);
    }
    
    // Animate explosion light
    const lightIntensity = 5 * (1.0 - progress);
    this.explosionLight.intensity = lightIntensity;
    this.explosionLight.position.y = this.explosionCenter.y + 0.5 + progress * 2;
    
    // Animate shockwave effect
    const shockwaveScale = 1.0 + progress * 20.0; // Rapid expansion
    this.shockwave.scale.set(shockwaveScale, shockwaveScale, shockwaveScale);
    (this.shockwave.material as MeshBasicMaterial).opacity = 0.8 * (1.0 - progress); // Fade out
    
    // Update materials
    const fireMaterial = this.fireParticles.material as MeshStandardMaterial;
    const smokeMaterial = this.smokeParticles.material as MeshStandardMaterial;
    
    fireMaterial.opacity = 1.0 - progress * 0.8;
    smokeMaterial.opacity = 0.7 * (1.0 - progress * 0.5);
    
    // Update fire shader uniforms for dynamic effect
    if (fireMaterial.userData.shader) {
      const shader = fireMaterial.userData.shader;
      shader.uniforms.time.value = this._time;
      shader.uniforms.intensity.value = 1.0 - progress * 0.5; // Fade intensity over time
      shader.uniforms.turbulence.value = 0.5 + progress * 0.5; // Increase turbulence
    }
    
    this.fireParticles.instanceMatrix.needsUpdate = true;
    this.smokeParticles.instanceMatrix.needsUpdate = true;
  }

  public finish(): void {
    this._actorManager.removeObject(this.fireParticles);
    this._actorManager.removeObject(this.smokeParticles);
    this._actorManager.removeObject(this.explosionLight);
    this._actorManager.removeObject(this.shockwave);
  }
}



// public computePosition(camera, interval) {
//   if (interval < 0.4) {
//     var position = this.getQuadratic( interval / 0.4 );
//   } else if (interval < 0.7) {
//     var position = this.getQuadratic( (interval-0.4) / 0.3 ) * -0.6;
//   } else if (interval < 0.9) {
//     var position = this.getQuadratic( (interval-0.7) / 0.2 ) * 0.3;
//   } else {
//     var position = this.getQuadratic( (interval-0.9) / 0.1 ) * -0.1;
//   }
  
//   // Here the camera is positioned according to the wavy 'position' variable.
//   camera.position.lerpVectors( this._startPoint, this._endPoint, position );
// }

// public getQuadratic(t: number) {
//   return 9.436896e-16 + (4*t) - (4*(t*t)) ;
// }