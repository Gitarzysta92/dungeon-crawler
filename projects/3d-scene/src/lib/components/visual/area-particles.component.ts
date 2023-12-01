import { Vector3, Matrix4 } from "three";

import { ActorsManager } from "../../actors/actors-manager";
import { GameObjectFactory } from "../../actors/game-objects.factory";
import { ParticlesObject } from "../../actors/game-objects/particles.game-object";


export class AreaParticlesComponent {
  private _time: number = 0;
  private _particles!: ParticlesObject;
  private _count: number = 20;
  private _matrix: Matrix4;
  private _vector: Vector3;

  constructor(
    private readonly _actorsManager: ActorsManager
  ) {
    this._matrix = new Matrix4();
    this._vector = new Vector3();
   }

  public recalculate(): void {
    for (let i = 0; i < this._count; i++) {
      this._time += 0.001;
      this._particles.object.getMatrixAt(i, this._matrix);
      this._vector.setFromMatrixPosition(this._matrix);
      if (this._vector.y > 10) {
        this._vector.y = 0;
      } else {
        this._vector.y += 0.005 * (i + 1);
      }
      this._particles.object.setMatrixAt(i, this._matrix.setPosition(this._vector));
    }
    this._particles.object.instanceMatrix.needsUpdate = true;
  } 

  public initialize(coords: Vector3): void {
    this._particles = GameObjectFactory.createSphericalParticles({
      coords: coords,
      count: this._count,
      color: 0xa07966
    });
    this._actorsManager.initializeObject(this._particles);
  }

};