import { Intersection, Object3D, Raycaster, Vector3 } from "three";
import { Actor } from "../../actors/actor.interface";
import { ActorsManager } from "../../actors/actors-manager";
import { ContinousTask } from "../../internals/tasks/tasks-queue";
import { Collidable } from "./collidable";

export class ColliderTask<T extends Collidable> implements ContinousTask {
  public object: T;
  public continue: boolean = true;
  public prevCollided: Map<string, Collidable> = new Map();

  private _raycaster: Raycaster = new Raycaster();
  private _subjectGameObjectCoords: Vector3 = new Vector3();
  private _raycasterDirection: Vector3 = new Vector3();
  private _temporaryGameObjects: (Collidable & Actor)[] = [];
  private _collidables: Object3D<Event>[] = [];
  private _intersections: Intersection<Object3D<Event>>[] = [];
  private _processedGameObject!: Collidable & Actor;
  private _recursiveIntersection: boolean = false;

  constructor(
    public sourceObject: T,
    private _actorsManager: ActorsManager
  ) {
    this.object = sourceObject;
    this._raycaster.params = {
      Line: { threshold: 1 },
      Points: { threshold: 1 },
    };
    this.object.onDestroy(() => { this.continue = false; });
  }

  public perform(): void {
    if (!this.object)
      this.finish();
    if (!this.continue)
      return;
    
    this._subjectGameObjectCoords.x = this.object.coords.x;
    this._subjectGameObjectCoords.y = this.object.coords.y;
    this._subjectGameObjectCoords.z = this.object.coords.z;
    
    this._updateRaycasterPosition();
    this._updateCollidableGameObjects();
    this._determineCollisions();
  }

  public finish(): void {
    this.continue = false;
    this.prevCollided.forEach(this._escapeCollision);
  }

  private _determineCollisions(): void {
    this._intersections.length = 0;
    this._temporaryGameObjects.length = 0;
    
    this._raycaster.intersectObjects(
      this._collidables,
      this._recursiveIntersection,
      this._intersections
    );

    for (let i of this._intersections) {
      this._processedGameObject = this._actorsManager.actors.get(i.object.uuid) as Collidable & Actor;
      if (!!this._processedGameObject && !!this._processedGameObject.collide) {
        this._processedGameObject.collide();
        this._temporaryGameObjects.push(this._processedGameObject);
        this.prevCollided.delete(this._processedGameObject.id);
      }
    }

    this.prevCollided.forEach(this._escapeCollision);
    this.prevCollided.clear();

    for (let o of this._temporaryGameObjects) {
      this.prevCollided.set(o.id, o);
    }
  }

  private _updateCollidableGameObjects(): void {
    this._collidables.length = 0;
    this._actorsManager.actors.forEach(this._addCollidable)
  }

  private _updateRaycasterPosition(): void {
    this._raycasterDirection.set(this._subjectGameObjectCoords.x, -30, this._subjectGameObjectCoords.y).normalize();
    this._raycaster.set(this._subjectGameObjectCoords, this._raycasterDirection);
  }

  private _escapeCollision = (o: Collidable) => o.escape();

  private _addCollidable = (o: Actor) => {
    if (!!(o as unknown as Collidable).collide) {
      this._collidables.push(o.object as unknown as Object3D<Event>)
    }
  };
}