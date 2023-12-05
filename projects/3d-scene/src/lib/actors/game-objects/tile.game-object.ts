import { Mesh, Vector3, ColorRepresentation, RingGeometry, CylinderGeometry, MeshStandardMaterial, Quaternion, Color } from "three";
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
  rotation: keyof typeof ROTATION_ANGLES,
  outlineColor: ColorRepresentation;

  mainMaterial: (MeshStandardMaterial)[],
  mainGeometry: CylinderGeometry,
  outlineMaterial: MeshStandardMaterial,
  outlineGeometry: RingGeometry,
}


export class TileObject extends GameObject implements Draggable, Animatable, Selectable, Hoverable, Collidable {
  public auxId: string;

  public outlineColor: ColorRepresentation;
  public rotation: number;

  public get animationSubject() { return this._object }
  public get mesh() { return this._object }

  protected _object!: Mesh<CylinderGeometry, (MeshStandardMaterial)[]>;
  private _mainGeometry: CylinderGeometry;
  private _mainMaterial: (MeshStandardMaterial)[];
  private _outlineMesh!: Mesh<RingGeometry, MeshStandardMaterial>;
  private _outlineGeometry: RingGeometry;
  private _outlineMaterial: MeshStandardMaterial;

  private _colorEffectStack: ColorEffectStack;
  
  public isHovered: boolean = false;
  public takenFieldId!: string;
  public settledCoords: Vector3 = new Vector3();

  constructor(cfg: TileGameConfig) {
    super(cfg.auxId);
    this.auxId = cfg.auxId;
    this.outlineColor = cfg.outlineColor;

    this._mainGeometry = cfg.mainGeometry;
    this._mainMaterial = cfg.mainMaterial;
    this._outlineGeometry = cfg.outlineGeometry;
    this._outlineMaterial = cfg.outlineMaterial;

    this._colorEffectStack = new ColorEffectStack(
      this._mainMaterial[0].color.getHexString(),
      '030303',
      '920202',
      '323232',
      '848484'
    );
    //this._mainMaterial[1].emissive = new Color("#2e84e5");
    this.rotation = cfg.rotation
  }
  
  public init(): Mesh {
    this._object = new Mesh(this._mainGeometry, this._mainMaterial);
    this._object.castShadow = false;
    this._object.receiveShadow = false;

    this._outlineMesh = new Mesh(this._outlineGeometry, this._outlineMaterial);
    this._outlineMesh.lookAt(new Vector3(0, 1, 0))
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


  public highlight(): void {
    this._mainMaterial[1].emissiveIntensity = 2;
    this._colorEffectStack.highlight(this._mainMaterial[0]);
  }

  public removeHighlight(): void {
    this._mainMaterial[1].emissiveIntensity = 0;
    this._colorEffectStack.removeHighlight(this._mainMaterial[0]);
  }

  collide!: (...args: any[]) => void;
  escape!: () => void;
}


class ColorEffectStack {

  public isHovered: boolean = false;
  public isSelected: boolean = false;
  public isHighlighted: boolean = false;
  public isHighlightedRange: boolean = false;

  constructor(
    private _defaultColor: ColorRepresentation,
    private _highlightColor: ColorRepresentation,
    private _selectColor: ColorRepresentation,
    private _hoveredColor: ColorRepresentation,
    private _highlightRangeColor: ColorRepresentation
  ) { }

  public highlight(material: MeshStandardMaterial): void {
    material.color.setHex(this._highlightColor as number)
    this.isHighlighted = true;
  }

  public removeHighlight(material: MeshStandardMaterial): void {
    material.color.setHex(this._defaultColor as number);
    this.isHighlighted = false;
  }

  public select(material: MeshStandardMaterial): void {
    material.color.setHex(this._selectColor as number);
    this.isSelected = true;
  }

  public removeSelect(material: MeshStandardMaterial): void {
    material.color.setHex((this.isHighlighted ? this._highlightColor : this._defaultColor) as number);
    this.isSelected = false;
  }

  public hovered(material: MeshStandardMaterial): void {
    material.color.setHex(this._hoveredColor as number)
    this.isHovered = true;
  }

  public removeHovered(material: MeshStandardMaterial): void {
    let color = this._defaultColor; 

    if (this.isHighlightedRange) {
      color = this._highlightRangeColor;
    }

    if (this.isHighlighted) {
      color = this._highlightColor;
    }

    if (this.isSelected) {
      color = this._selectColor;
    }

    material.color.setHex(color as number);
    this.isHovered = false;
  }

  public highlightRange(material: MeshStandardMaterial) {
    material.color.setHex(this._highlightRangeColor as number);
    this.isHighlightedRange = true;
  }

  public removeHighlightRange(material: MeshStandardMaterial) {
    let color = this._defaultColor; 

    if (this.isHovered) {
      color = this._hoveredColor;
    }

    if (this.isHighlighted) {
      color = this._highlightColor;
    }

    if (this.isSelected) {
      color = this._selectColor;
    }
    
    material.color.setHex(color as number)
    this.isHighlightedRange = false;
  }
}