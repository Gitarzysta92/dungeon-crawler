import { Color, ColorRepresentation, CylinderGeometry, Material, Mesh, MeshStandardMaterial, RingGeometry, Vector3 } from "three";
import { Collidable } from "../../behaviours/collision/collidable";
import { Hoverable } from "../../behaviours/hover/hoverable";
import { GameObject } from "./game-object";
import { TileObject } from "./tile.game-object";
import { Selectable } from "../../behaviours/select/selectable";


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

export class FieldObject extends GameObject implements Collidable, Hoverable, Selectable {


  public auxCoords: any;
  public isHovered: boolean = false;

  public get isHighlighted() { return this._colorEffectStack.isHighlighted }
  public get isSelected() { return this._colorEffectStack.isSelected }

  protected _object!: Mesh<CylinderGeometry, MeshStandardMaterial>;
  private _mainGeometry: CylinderGeometry;
  private _mainMaterial: MeshStandardMaterial;

  private _upperMesh!: Mesh<CylinderGeometry, MeshStandardMaterial>;
  private _upperGeometry: CylinderGeometry;
  private _upperMaterial: MeshStandardMaterial;

  private _topMesh!: Mesh<RingGeometry, MeshStandardMaterial>;
  private _topGeometry: RingGeometry;
  private _topMaterial: MeshStandardMaterial;

  private _colorEffectStack: ColorEffectStack;
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

    this._colorEffectStack = new ColorEffectStack(
      this._upperMaterial.color.getHexString(),
      '030303',
      '920202',
      '323232',
      '848484'
    );
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
    currentObj.takenFieldId = this.id;
    const temp = this.coords.clone();
    temp.y = (this._object.geometry.parameters.height + this._upperMesh.geometry.parameters.height) + 3;
    return {
      coords: temp,
      quat: currentObj.object.quaternion.clone()
    }
  }

  public collide(color: Color) {
   this.highlight();
  }

  public escape() {
    this.removeHighlight();
  }

  public applyMask() {
    super.applyMask();
    if (this.isHighlighted === false) {
      this._topMesh.material = <MeshStandardMaterial>this.object.material;
    };
    this._upperMesh.material = <MeshStandardMaterial>this.object.material;
  }

  public cancelMask() {
    super.cancelMask();
    this._topMesh.material = this._topMaterial;
    this._upperMesh.material = this._upperMaterial;
  }

  public highlight(): void {
    this._colorEffectStack.highlight(this._topMaterial);
  }

  public removeHighlight(): void {
    this._colorEffectStack.removeHighlight(this._topMaterial);
  }

  public select(): void {
    this._colorEffectStack.select(this._topMaterial)
  }

  public unselect(): void {
    this._colorEffectStack.removeSelect(this._topMaterial);
  }

  public hovered(): void {
    this._colorEffectStack.hovered(this._topMaterial);
  }

  public settled(): void {
    this._colorEffectStack.removeHovered(this._topMaterial);
  }

  public highlightRange() {
    this._colorEffectStack.highlightRange(this._topMaterial);
  }

  public removeHighlightRange() {
    this._colorEffectStack.removeHighlightRange(this._topMaterial);
  }
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