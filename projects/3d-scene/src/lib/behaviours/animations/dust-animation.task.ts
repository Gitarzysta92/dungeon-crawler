import { InstancedMesh, Matrix4, Sprite, Vector3 } from "three";
import { ContinousTask } from "../../internals/tasks/tasks-queue";
import { Animatable } from "./animatable";

export class DustAnimationTask<T extends Animatable, T2 extends Animatable> implements ContinousTask  {
  
  public particles: InstancedMesh;
  public dust: Sprite;
  public continue: boolean = true;
  cb: Function[] = []; 

  private _time: number = 0;
  private _count: number = 0;
  private _vector: Vector3 = new Vector3();
  private _matrix: Matrix4 = new Matrix4();

  private _targetCoords: Vector3[] = []

  constructor(
    targetCoords: Vector3[],
    particles: T,
    dust: T2
  ) {
    this.particles = <InstancedMesh>particles.animationSubject;
    this.dust = <Sprite>dust.animationSubject; 
    this._count = this.particles.count;
    this._targetCoords = targetCoords;
  }
  
  public perform = () => {
    if (this._time > 3) {
      return this.finish();
    }

    for (let i = 0; i <= this._count; i++) {
      this.particles.getMatrixAt(i, this._matrix);
      this._vector.setFromMatrixPosition(this._matrix);
      this._vector.lerp(this._targetCoords[i], 0.2);
      this._vector.y = (-5 * Math.pow(this._time, this._time) + (0.8 * i) * this._time) * 3;
      this.particles.setMatrixAt(i, this._matrix.setPosition(this._vector));
    }

    this._time += 0.1;
    this.dust.scale.set(Math.sin(this._time) * 10, Math.sin(this._time) * 10, this._time * 10)

    this.dust.material.opacity = 1 - (this._time * 0.5)
    this.particles.instanceMatrix.needsUpdate = true;
  }

  public finish(): void {
    this.continue = false;
    this.cb.forEach(c => c());
  }

  public onFinish(o: any) {
    this.cb.push(o);
  }


} 
