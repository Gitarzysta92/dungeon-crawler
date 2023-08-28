import { Vector3, BufferGeometry, Material, Mesh, Object3D, Event } from "three";
import { Actor } from "../actor.interface";

export class GuiObject implements Actor {

  initialCoords: Vector3;
  auxId: any;
  geometry: BufferGeometry;
  material: Material;
  public child: any;

  public get id() { return this._mesh?.uuid }
  public get coords() { return this._mesh?.position }
  public get object() { return this._mesh };
  public get quaternion() { return this._mesh.quaternion }
  public get mesh() { return this._mesh };

  private _mesh!: Mesh<BufferGeometry, any>;
  private _onDestroy: ((x: this) => void)[]

  constructor(
    c: Vector3,
    g: BufferGeometry,
    m: Material,
    auxId?: any
  ) { 
    this.geometry = g;
    this.material = m;
    this.auxId = auxId;
    this.initialCoords = c;

    this._onDestroy = [];
  }


  init(): Object3D<Event> {
    if (!!this._mesh)
      return this._mesh;

    this._mesh = new Mesh(this.geometry, this.material);
    
    if (this.initialCoords) {
      this._mesh.translateX(this.initialCoords.x);
      this._mesh.translateY(this.initialCoords.y);
      this._mesh.translateZ(this.initialCoords.z);      
    }

    this._mesh.receiveShadow = false;
    this._mesh.castShadow = false;

    if (this.child) {
      this._mesh.add(this.child);
    }

    this._mesh.userData.isGui = true;
    this._mesh.userData.ref = this;

    return this._mesh;
  }

  onDestroy(cb: (x: Actor) => void): void {
    this._onDestroy.push(cb);
  }

  public applyMask(): void { }

  public cancelMask(): void { }

}