import { Color, ColorRepresentation, CylinderGeometry, Material, Mesh, MeshStandardMaterial, RingGeometry, Vector3 } from "three";
import { Collidable } from "../../behaviours/collision/collidable";
import { GameObject } from "./game-object";
import { TileObject } from "./tile.game-object";


export interface FieldObjectConfig {
  auxId: string,
  auxCoords: any,
  position: Vector3,

  mainMaterial: MeshStandardMaterial,
  mainGeometry: CylinderGeometry,
  upperMaterial: MeshStandardMaterial,
  upperGeometry: CylinderGeometry,
  topMaterial: MeshStandardMaterial,
  topGeometry: RingGeometry
}

export class FieldObject extends GameObject implements Collidable {
  public auxCoords: any;

  protected _object!: Mesh<CylinderGeometry, MeshStandardMaterial>;
  private _mainGeometry: CylinderGeometry;
  private _mainMaterial: MeshStandardMaterial;

  private _upperMesh!: Mesh<CylinderGeometry, MeshStandardMaterial>;
  private _upperGeometry: CylinderGeometry;
  private _upperMaterial: MeshStandardMaterial;

  private _topMesh!: Mesh<RingGeometry, MeshStandardMaterial>;
  private _topGeometry: RingGeometry;
  private _topMaterial: MeshStandardMaterial;

  private _tempColors: Map<any, Color> = new Map();
  private _isHighlighted: boolean = false;
  private _initialPosition: Vector3;

  constructor(cfg: FieldObjectConfig) {
    super(cfg.auxId);
    this.auxCoords = cfg.auxCoords;
    this._initialPosition = cfg.position;

    this._mainGeometry = cfg.mainGeometry;
    this._mainMaterial = cfg.mainMaterial;

    this._upperGeometry = cfg.upperGeometry;
    this._upperMaterial = cfg.upperMaterial;
    
    this._topGeometry = cfg.topGeometry;
    this._topMaterial = cfg.topMaterial;
  }
  mesh: any;

  public init(): Mesh {
    this._object = new Mesh(this._mainGeometry, this._mainMaterial);
    this._object.position.set(
      this._initialPosition.x,
      this._initialPosition.y,
      this._initialPosition.z
    );
    this._object.castShadow = true;
    this._object.receiveShadow = true;

    this._upperMesh = new Mesh(this._upperGeometry, this._upperMaterial);
    this._object.add(this._upperMesh);
    this._upperMesh.position.y = 2.7;
    this._upperMesh.castShadow = false;
    this._upperMesh.receiveShadow = false;

    this._topMesh = new Mesh(this._topGeometry, this._topMaterial);
    this._object.add(this._topMesh);
    this._topMesh.position.y = 3.2;
    this._topMesh.rotateX(Math.PI / 180 * -90)
    this._topMesh.rotateZ(Math.PI / 180 * 30);
    
    super.init();
    return this._object;   
  }

  public takeBy(currentObj: TileObject) {
    currentObj.takesField = this.id;
    const temp = this.coords.clone();
    temp.y = 6;
    return {
      coords: temp,
      quat: currentObj.object.quaternion.clone()
    }
  }

  public collide(color: Color) {
    this.highlight(color);
  }

  public escape() {
    this.removeHighlight();
  }

  public applyMask() {
    super.applyMask();
    if (this._isHighlighted === false) {
      this._topMesh.material = <MeshStandardMaterial>this.object.material;
    };
    this._upperMesh.material = <MeshStandardMaterial>this.object.material;
  }

  public cancelMask() {
    super.cancelMask();
    this._topMesh.material = this._topMaterial;
    this._upperMesh.material = this._upperMaterial;
  }

  public highlight(color: ColorRepresentation): void {
    this._tempColors.set(this._upperMaterial, this._upperMaterial.color);
    this._upperMaterial.color.set(color);
    this._isHighlighted = true;
  }

  public removeHighlight(): void {
    const color = this._tempColors.get(this._upperMaterial);
    if (!color)
      throw new Error('Not found color for: removeHighlight function');
  
    this._upperMaterial.color.set(color);
    this._isHighlighted = false;
  }

}