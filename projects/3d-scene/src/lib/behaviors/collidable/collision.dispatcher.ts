import { ActorsManager } from "../../actors/actors-manager";
import { TasksQueue } from "../../utils/tasks-queue/tasks-queue";
import { ICollidable } from "./collidable.interface";
import { ColliderTask } from "./collider.task";


export class CollisionDispatcher {
  
  private _registeredColliders: { [key: string]: ColliderTask<any> } = {}

  constructor(
    private _actorsManager: ActorsManager,
    private _tasksQueue: TasksQueue
  ) { }

  public handle<T extends ICollidable>(tile: T): void {
    this._registeredColliders[tile.id] = new ColliderTask(tile, this._actorsManager);
    this._tasksQueue.enqueue(this._registeredColliders[tile.id]);
  }

  public stopColliding<T extends ICollidable>(tile: T): void {
    if (!this._registeredColliders[tile.id])
      return;

    this._registeredColliders[tile.id].finish();
    delete this._registeredColliders[tile.id];
  }

  public startColliding(tile: ICollidable): void {
    this.handle(tile);  
  }

  public getCurrentCollision<T extends ICollidable>(tile: T): T[] | undefined {
    const collisions = this._registeredColliders[tile.id]?.prevCollided?.values();
    if (!collisions)
      return;
    
    return Array.from(collisions) as T[];
  }
}