import { Mesh, MeshStandardMaterial, PlaneGeometry } from "three";
import { GameObject } from "./game-object";

export interface TerrainObjectConfig {
  mainMaterialMask: MeshStandardMaterial,
  mainMaterial: MeshStandardMaterial,
  mainGeometry: PlaneGeometry,
}

export class TerrainObject extends GameObject {

  protected _object!: Mesh<PlaneGeometry, MeshStandardMaterial>;
  private _mainGeometry: PlaneGeometry;
  private _mainMaterial: MeshStandardMaterial;
  private _mainMaterialMask: MeshStandardMaterial;

  constructor(cfg: TerrainObjectConfig) {
    super("");
    this._mainGeometry = cfg.mainGeometry;
    this._mainMaterial = cfg.mainMaterial;
    this._mainMaterialMask = cfg.mainMaterialMask;
  }

  public init(): Mesh {
    this._object = new Mesh(this._mainGeometry, this._mainMaterial);
    //this._object.castShadow = true;
    this._object.receiveShadow = true;

    const mesh = super.init();
    return mesh as Mesh;
  }

  public applyMask() {
    this._tempMaterial = this.object.material;
    this.object.material = this._mainMaterialMask;
  }

  public cancelMask() {
    this.object.material = this._tempMaterial!;
  }
}
