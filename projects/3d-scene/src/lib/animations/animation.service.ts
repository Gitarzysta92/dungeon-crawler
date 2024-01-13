import { IAnimatable } from "./animations.interface";
import { AnimationTask } from "./animation.task";
import { TasksQueue } from "../utils/tasks-queue/tasks-queue";

export class AnimationService {

  private _registeredAnimations: Map<AnimationTask<IAnimatable>, AnimationTask<IAnimatable>> = new Map();

  constructor(
    private readonly _tasksQueue: TasksQueue
  ) { }

  public async animate<T extends AnimationTask<IAnimatable>>(animation: T): Promise<void> {
    return new Promise<void>((resolve, _) => {
      animation.onFinish(() => {
        resolve();
        this._registeredAnimations.delete(animation);
      });
      this._registeredAnimations.set(animation, animation);
      this._tasksQueue.enqueue(animation);
    });
  }

  public async waitForAllBlockingAnimationsToResolve(): Promise<void[]> {
    const animationsToWait = [];
    for (let x of this._registeredAnimations.values()) {
      if (x.isBlocking) {
        animationsToWait.push(x);
      }
    }
    return Promise.all(animationsToWait.map(atw => {
      return new Promise<void>((resolve, _) => atw.onFinish(() => resolve()))
    }))
  }

}