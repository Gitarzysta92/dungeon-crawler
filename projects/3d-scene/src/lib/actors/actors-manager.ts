import { Object3D, Vector3 } from "three";
import { Renderer } from "../core/renderer";
import { SceneWrapper } from "../core/scene-wrapper";
import { IActor } from "./actor.interface";
import { IOnActorDestroy, IAfterActorInitialization, IAfterActorEnteringScene } from "./actor-lifecycle.interface";

export class ActorsManager {

  public actors: Map<string, IActor> = new Map();
  public auxIds: Map<string, string> = new Map();

  private _terrainId: string | undefined;
  referenceField: any;

  constructor(
    private readonly _sceneWrapper: SceneWrapper,
    private readonly _renderer: Renderer
  ) { }

  public initializeObject<T extends IActor>(actor: T & Partial<IAfterActorInitialization> & Partial<IAfterActorEnteringScene>): T {
    const object = actor.init();
    if (actor.afterInitialization) {
      actor.afterInitialization();
    }
    this.actors.set(actor.id, actor);

    if (actor.auxId) {
      this.auxIds.set(actor.auxId, actor.id);
    }
    this._sceneWrapper.scene.add(object);

    actor.registerOnDestroy && actor.registerOnDestroy(o => {
      this.actors.delete(actor.id);
      this._renderer.webGlRenderer.renderLists.dispose();
    });
    return actor;
  }

  public deleteObject<T extends IActor>(actor: T & Partial<IOnActorDestroy>): void {
    let lifecycleResult: Promise<void> | undefined | void;
    if (actor.onDestroy) {
      lifecycleResult = actor.onDestroy();
    }

    if (lifecycleResult && lifecycleResult instanceof Promise) {
      lifecycleResult.then(() => actor.destroy());
    } else {
      actor.destroy();
    }
  }

  public deleteObjectByAuxId(auxId: string): void {
    const object = this.getObjectByAuxId(auxId);
    if (!object) {
      return;
    }
    this.deleteObject(object);
  }

  public getObject<T extends IActor>(objectId: string): T | undefined {
    return this.actors.get(objectId) as T | undefined
  }

  public getObjectByAuxId<T extends IActor>(auxId: string): T | undefined {
    return this.actors.get(this.auxIds.get(auxId)!) as T | undefined
  }

  public sceneHasChild<T extends IActor>(a: T): boolean {
    return this._sceneWrapper.scene.children.some(c => c.uuid === a.id);
  }

  public attachToScene<T extends IActor>(a: T): void { 
    this._sceneWrapper.scene.add(a.object);
  }

  public detachFromScene<T extends IActor>(a: T): void { 
    this._sceneWrapper.scene.remove(a.object);
  }

  public cameraHasChild<T extends IActor>(a: T): boolean {
    return this._sceneWrapper.camera.children.some(c => c.uuid === a.id);
  }

  public attachToCamera<T extends IActor>(a: T): void {
    a.object.lookAt(new Vector3(0, -1, 0));
    this._sceneWrapper.camera.add(a.object);
  }

  public detachFromCamera<T extends IActor>(a: T): void { 
    this._sceneWrapper.camera.remove(a.object);
  }

  public addObject(o: Object3D): void {
    this._sceneWrapper.scene.add(o);
  }
}   