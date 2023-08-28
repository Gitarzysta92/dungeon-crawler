import { Observable } from "rxjs";
import { Quaternion, Sprite, Vector3 } from "three";
import { TasksQueue } from "../../internals/tasks/tasks-queue";
import { Animatable } from "./animatable";
import { AnimationTask } from "./animation.task";
import { DustAnimationTask } from "./dust-animation.task";
import { RotateAnimationTask } from "./rotate-animation.task";

export class AnimationDispatcher {

  private _registeredAnimations: WeakMap<Animatable, AnimationTask<any>> = new WeakMap();

  constructor(
    private readonly _tasksQueue: TasksQueue
  ) { }

  public transition<T extends Animatable>(
    tile: T,
    targetCoords: Vector3 | Observable<Vector3>,
    targetQuaternion?: Quaternion | null,
    cfg? : { delay: number }
  ): Promise<void> {
    const animationTask = new AnimationTask(tile, targetCoords, targetQuaternion!);
    this._registeredAnimations.set(tile, animationTask);
    setTimeout(() => this._tasksQueue.enqueue(animationTask), cfg?.delay || 0);
    return new Promise((resolve, _) =>
      animationTask.onFinish(() => {
        resolve();
        this._registeredAnimations.delete(tile);
      }));
  }

  public rotate<T extends Animatable>(
    tile: T,
    targetQuaternion: Quaternion
  ): Promise<void> {
    const animationTask = new RotateAnimationTask(tile, targetQuaternion)
    this._tasksQueue.enqueue(animationTask);
    return new Promise((resolve, reject) => {
      animationTask.onFinish(() => {
        resolve();
      });
    });
  }

  public animateDust<T extends Animatable, T2 extends Animatable>(targetCoords: Vector3[], particles: T, dust: T2): Promise<void> {
    const animationTask = new DustAnimationTask(targetCoords, particles, dust)
    this._tasksQueue.enqueue(animationTask);
    return new Promise((resolve, reject) => {
      animationTask.onFinish(() => {
        resolve();
      });
    });
  }

  public isAnimating<T extends Animatable>(tile: T): boolean {
    return this._registeredAnimations.has(tile);
  }
}