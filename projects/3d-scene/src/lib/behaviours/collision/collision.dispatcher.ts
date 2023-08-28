
import { ActorsManager } from "../../actors/actors-manager";
import { TasksQueue } from "../../internals/tasks/tasks-queue";
import { Collidable } from "./collidable";
import { ColliderTask } from "./collider.task";


export class CollisionDispatcher {
  
  private _registeredColliders: { [key: string]: ColliderTask<any> } = {}

  constructor(
    private _actorsManager: ActorsManager,
    private _tasksQueue: TasksQueue
  ) { }

  public handle<T extends Collidable>(tile: T): void {
    this._registeredColliders[tile.id] = new ColliderTask(tile, this._actorsManager);
    this._tasksQueue.enqueue(this._registeredColliders[tile.id]);
  }

  public stopColliding<T extends Collidable>(tile: T): void {
    if (!this._registeredColliders[tile.id])
      return;

    this._registeredColliders[tile.id].finish();
    delete this._registeredColliders[tile.id];
  }

  public startColliding(tile: Collidable): void {
    this.handle(tile);  
  }

  public getCurrentCollision<T extends Collidable>(tile: T): T[] | undefined {
    const collisions = this._registeredColliders[tile.id]?.prevCollided?.values();
    if (!collisions)
      return;
    
    return Array.from(collisions) as T[];
  }
}