import { Mesh, Vector3, ColorRepresentation, MeshBasicMaterial, RingGeometry, CylinderGeometry, MeshStandardMaterial, BufferGeometry, InstancedMesh, Material, Sprite, Quaternion } from "three";
import { Draggable } from "../../behaviours/drag/draggable";
import { Hoverable } from "../../behaviours/hover/hoverable";
import { Selectable } from "../../behaviours/select/selectable";
import { Animatable } from "../../behaviours/animations/animatable";
import { GameObject } from "./game-object";
import { Collidable } from "../../behaviours/collision/collidable";
import { ROTATION_ANGLES } from "../../constants/tile-rotation-radians";


export interface TileGameConfig {
  auxId: string,
  position: Vector3,
  rotation?: keyof typeof ROTATION_ANGLES,
  outlineColor: ColorRepresentation;

  mainMaterial: (MeshStandardMaterial | MeshBasicMaterial)[],
  mainGeometry: CylinderGeometry,
  outlineMaterial: MeshBasicMaterial,
  outlineGeometry: RingGeometry,
}


export class TileObject extends GameObject implements Draggable, Animatable, Selectable, Hoverable, Collidable {
  public auxId: string;

  public outlineColor: ColorRepresentation;

  public get animationSubject() { return this._object }
  public get mesh() { return this._object }

  protected _object!: Mesh<CylinderGeometry, (MeshStandardMaterial | MeshBasicMaterial)[]>;
  private _mainGeometry: CylinderGeometry;
  private _mainMaterial: (MeshStandardMaterial | MeshBasicMaterial)[];
  private _outlineMesh!: Mesh<RingGeometry, MeshBasicMaterial>;
  private _outlineGeometry: RingGeometry;
  private _outlineMaterial: MeshBasicMaterial;
  
  public isHovered: boolean = false;
  public takesField!: string;
  public settledCoords: Vector3 = new Vector3();

  constructor(cfg: TileGameConfig) {
    super(cfg.auxId);
    this.auxId = cfg.auxId;
    this.outlineColor = cfg.outlineColor;

    this._mainGeometry = cfg.mainGeometry;
    this._mainMaterial = cfg.mainMaterial;
    this._outlineGeometry = cfg.outlineGeometry;
    this._outlineMaterial = cfg.outlineMaterial;
  }

  
  public init(): Mesh {
    this._object = new Mesh(this._mainGeometry, this._mainMaterial);
    this._object.castShadow = false;
    this._object.receiveShadow = false;

    this._outlineMesh = new Mesh(this._outlineGeometry, this._outlineMaterial);
    this._object.add(this._outlineMesh);
    this._outlineMesh.name = "outline";
    this._outlineMesh.visible = false;

    const mesh = super.init();
    return mesh as Mesh;   
  }

  public setCoords(v: Vector3): void {
    if (v.x !== null) {
      this.object.position.setX(v.x);
    }
    if (v.y !== null) {
      this.object.position.setY(v.y);
    }
    if (v.z !== null) {
      this.object.position.setZ(v.z);
    }
  }

  setQuaternion(q: Quaternion) {
    if (q != null) {
      this.object.quaternion.set(q.x, q.y, q.z, q.w);
    }
  }

  public select() {
    this._outlineMesh.visible = true;
  }

  public unselect() {
    this._outlineMesh.visible = false;
  }

  public hovered(): void {
    this._outlineMesh.visible = true;
    this.settledCoords.copy(this.object.position);
  }

  public settled(): void {
    this._outlineMesh.visible = false;
  }

  collide!: (...args: any[]) => void;
  escape!: () => void;

}