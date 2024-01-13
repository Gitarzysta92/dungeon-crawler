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
    if (this.mesh.quaternion.equals(this.targetQuaternion)) {
      return this.finish();
    }
    this.mesh.quaternion.rotateTowards(this.targetQuaternion, 0.2)
  }

  public finish(): void {
    this.continue = false;
    this.cb.forEach(cb => cb());
  }

  public onFinish(o: any) {
    this.cb.push(o);
  }
}