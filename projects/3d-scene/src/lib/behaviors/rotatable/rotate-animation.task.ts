import { Quaternion, Mesh } from "three";
import { IAnimatable } from "../../animations/animations.interface";
import { IContinousTask } from "../../utils/tasks-queue/tasks-queue.interface";

export class RotateAnimationTask<T extends IAnimatable> implements IContinousTask  {

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
  public initialize!: () => void;
  
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
    this.cb.forEach(cb => cb());
  }

  public onFinish(o: any) {
    this.cb.push(o);
  }
}