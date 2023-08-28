import { Object3D, Vector3 } from "three";
import { Renderer } from "../internals/rendering/renderer";
import { View } from "../internals/scene/view";
import { Actor } from "./actor.interface";
import { TerrainObject } from "./game-objects/terrain.game-object";

export class ActorsManager {

  public actors: Map<string, Actor> = new Map();
  public auxIds: Map<string, string> = new Map();

  private _terrainId: string | undefined;
  referenceField: any;

  constructor(
    private readonly _view: View,
    private readonly _renderer: Renderer
  ) { }

  public initializeObject<T extends Actor>(actor: T): Object3D {
    const object = actor.init();
    this.actors.set(actor.id, actor);

    if (actor.auxId) {
      this.auxIds.set(actor.auxId, actor.id);
    }
    this._view.scene.add(object);

    actor.onDestroy && actor.onDestroy(o => {
      this.actors.delete(actor.id);
      this._renderer.webGlRenderer.renderLists.dispose();
    });

    if (actor instanceof TerrainObject) {
      this._terrainId = actor.id;
    }

    return object;
  }

  public getObject<T extends Actor>(objectId: string): T | undefined {
    return this.actors.get(objectId) as T | undefined
  }

  public getObjectByAuxId<T extends Actor>(auxId: string): T | undefined {
    return this.actors.get(this.auxIds.get(auxId) ?? "") as T | undefined
  }

  public sceneHasChild<T extends Actor>(a: T): boolean {
    return this._view.scene.children.some(c => c.uuid === a.id);
  }

  public attachToScene<T extends Actor>(a: T): void { 
    this._view.scene.add(a.object);
  }

  public detachFromScene<T extends Actor>(a: T): void { 
    this._view.scene.remove(a.object);
  }

  public cameraHasChild<T extends Actor>(a: T): boolean {
    return this._view.camera.children.some(c => c.uuid === a.id);
  }

  public attachToCamera<T extends Actor>(a: T): void {
    a.object.lookAt(new Vector3(0, -1, 0));
    this._view.camera.add(a.object);
  }

  public detachFromCamera<T extends Actor>(a: T): void { 
    this._view.camera.remove(a.object);
  }

  public integrate(light: any): void {
    this._view.scene.add(light);
  }

  public getTerrain(): TerrainObject {
    return this.actors.get(this._terrainId!) as TerrainObject;
  }

}   