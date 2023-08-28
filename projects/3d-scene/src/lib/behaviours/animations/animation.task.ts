import { Subject, Observable, takeUntil } from "rxjs";
import { Mesh, Vector3, Quaternion } from "three";
import { ContinousTask } from "../../internals/tasks/tasks-queue";
import { Animatable } from "./animatable";

export class AnimationTask<T extends Animatable> implements ContinousTask {

  public continue: boolean = true;
  public mesh: Mesh;
  public targetCoords: Vector3;
  public targetQuaternion?: Quaternion;
  public cb: Function[];
  
  private readonly _destroy: Subject<void> = new Subject();

  constructor(
    actor: T,
    targetCoords: Vector3 | Observable<Vector3>,
    targetQuaternion?: Quaternion
  ) {
    this.mesh = actor.animationSubject as Mesh;

    if (targetCoords instanceof Vector3) {
      this.targetCoords = Object.assign(this.mesh.position.clone(), targetCoords);
    } else {
      this.targetCoords = new Vector3();
      (targetCoords as Observable<Vector3>)
        .pipe(takeUntil(this._destroy))
        .subscribe(value => {
          this.targetCoords.setX(value.x);
          this.targetCoords.setY(value.y);
          this.targetCoords.setZ(value.z);
        });
    }

    !!targetQuaternion && (this.targetQuaternion = targetQuaternion.clone());
    this.cb = [];
  }

  public perform = () => {
    if (this._checkIsTargetCoordsAchieved(this.mesh.position, this.targetCoords)) {
      const { x, y, z } = this.targetCoords.round();
      this.mesh.position.set(x, y, z);
      return this.finish();
    }

    //console.log(this.mesh.position.clone());

    this.mesh.position.lerp(this.targetCoords, 0.2);
    !!this.targetQuaternion && this.mesh.quaternion.slerp(this.targetQuaternion, 0.2);
  }

  public onFinish(o: any) {
    this.cb.push(o);
  }

  public finish(): void {
    this._destroy.next();
    this.continue = false;
    this.cb.forEach(c => c());
  }

  private _checkIsTargetCoordsAchieved(source: Vector3, target: Vector3): boolean {
    if (Math.abs(source.x - target.x) > 0.1)
      return false;
    
    if (Math.abs(source.y - target.y) > 0.1)
      return false;
    
    if (Math.abs(source.z - target.z) > 0.1)
      return false;
    
    return true;
  }
}