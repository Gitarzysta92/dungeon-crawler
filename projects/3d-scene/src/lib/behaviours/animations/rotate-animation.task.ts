import { Quaternion, Mesh } from "three";
import { ContinousTask } from "../../internals/tasks/tasks-queue";
import { Animatable } from "./animatable";

export class RotateAnimationTask<T extends Animatable> implements ContinousTask  {

  public targetQuaternion: Quaternion;
  public mesh: Mesh;
  public continue: boolean = true;

  cb: Function[] = []; 

  constructor(
    object: T,
    targetQuaternion: Quaternion
  ) {
    this.mesh = <Mesh>object.animationSubject;
    this.targetQuaternion = targetQuaternion;
  }
  
  public perform = () => {
    if (
      Math.abs(this.mesh.quaternion.x).toFixed(2) === Math.abs(this.targetQuaternion.x).toFixed(2) &&
      Math.abs(this.mesh.quaternion.y).toFixed(2) === Math.abs(this.targetQuaternion.y).toFixed(2) &&
      Math.abs(this.mesh.quaternion.z).toFixed(2) === Math.abs(this.targetQuaternion.z).toFixed(2) &&
      Math.abs(this.mesh.quaternion.w).toFixed(2) === Math.abs(this.targetQuaternion.w).toFixed(2)
    ) {
      return this.finish();
    }
    this.mesh.quaternion.slerp(this.targetQuaternion, 0.2);
  }

  public finish(): void {
    this.continue = false;
  }

  public onFinish(o: any) {
    this.cb.push(o);
  }
}