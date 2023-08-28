import { Event, Material, Mesh, MeshBasicMaterial, Object3D, Sprite } from "three";
import { Actor } from "../actor.interface";

export const maskDefaultMaterial = new MeshBasicMaterial({ color: 'black' });

export abstract class GameObject implements Actor {

  public auxId: string;
  public get id() { return this._object?.uuid }
  public get coords() { return this._object?.position }
  public get object() { return this._object };
  public get quaternion() { return this._object.quaternion }

  protected abstract _object: Sprite | Mesh;
  protected _maskMaterial: Material = maskDefaultMaterial;
  protected _tempMaterial: Material[] | Material | undefined;

  private _onDestroy: ((x: Actor) => void)[] = [];

  constructor(auxId: string) {
    this.auxId = auxId;
  }

  public init(): Sprite | Mesh {
    if (!this._object)
      throw new Error("No defined mesh for initialization");
    
    this._object.userData.ref = this;
    return this._object;
  }

  public onDestroy(cb: (x: Actor) => void): void {
    this._onDestroy.push(cb);
  }

  public destroy(): void {
    Array.isArray(this.object.material) ?
        this.object.material.forEach((m: Material) => m.dispose()) :
        this.object.material.dispose();
    this._onDestroy.forEach(cb => cb(this));
  }

  public applyMask() {
    this._tempMaterial = this.object.material;
    this.object.material = this._maskMaterial;
  }

  public cancelMask() {
    this.object.material = this._tempMaterial!;
  }

};