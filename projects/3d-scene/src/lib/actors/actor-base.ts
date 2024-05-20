import { BufferGeometry, Camera, Material, Mesh, Object3D, Vector2, Vector3 } from "three";
import { IActor, IActorDefinition } from "./actor.interface";
import { IBehaviorHolder } from "../behaviors/behavior-holder.interface";
import { IRawVector3 } from "../extensions/types/raw-vector3";

export abstract class
  ActorBase implements IActor, IBehaviorHolder {

  public auxId: string;
  public auxCoords: string;
  public get id() { return this._object?.uuid }
  public get coords() { return this._object?.position }
  public get object() { return this._object };
  public get quaternion() { return this._object.quaternion }

  protected abstract _object: Object3D & Partial<{ material: Material | Material[], geometry: BufferGeometry }>;
  private _onDestroy: ((x: IActor) => void)[] = [];

  private _boundingBoxCenter: Vector3 = new Vector3();
  private _viewportCoords: Vector3 = new Vector3()

  constructor(def: IActorDefinition) {
    this.auxId = def.auxId;
    this.auxCoords = def.auxCoords;

  }

  public matchId(id: string): boolean {
    return (this.id === id || this.auxId === id) && id !== undefined;
  };

  public matchAuxCoords(auxCoords: string): boolean {
    return this.auxCoords === auxCoords;
  };


  public init(): Object3D & Partial<{ material: Material | Material[] }> {
    if (!this._object)
      throw new Error("No defined mesh for initialization");
    
    this._object.userData.ref = this;
    return this._object;
  }

  public registerOnDestroy(cb: (x: IActor) => void): void {
    this._onDestroy.push(cb);
  }

  public onDestroy(): void {
    this.traverseUp(this.object, o => this.dispose(o))
    this._onDestroy.forEach(cb => cb(this));
  }

  public getViewportCoords(camera: Camera, offsetY: number, ...args: unknown[]): IRawVector3 {
    this._viewportCoords.copy(this.coords);
    this._viewportCoords.setY(this._viewportCoords.y + offsetY)
    this._viewportCoords.project(camera);
    return this._viewportCoords;
  }

  public setPosition(p: Vector3 | IRawVector3, byCenter: boolean = false): void {
    (this.object as Mesh).geometry?.boundingBox?.getCenter(this._boundingBoxCenter);
    if (byCenter) {
      p.x -= this._boundingBoxCenter.x;
      p.z -= this._boundingBoxCenter.z;
    }
    this.object.position.set(p.x, p.y, p.z);
  }

  public update(): void {
    this.object.updateMatrix();
    this.object.updateMatrixWorld();
  }

  public traverseUp(o: Object3D, cb: (o: Object3D) => void) {
    if (Array.isArray(o.children)) {
      for (let child of o.children) {
        this.traverseUp(child, cb);
      }
    }
    cb(o);
  }

  public dispose(
    o: Object3D & Partial<{ material: Material | Material[], geometry: BufferGeometry }>
  ) {
    if (Array.isArray(o.material)) {
      for (let m of o.material) {
        m.dispose()
      }
    } else {
      o.material?.dispose();
    }
 
    o.geometry?.dispose();
  }
};