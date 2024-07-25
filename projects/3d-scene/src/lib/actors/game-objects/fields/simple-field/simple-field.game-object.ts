import { Color, CylinderGeometry, Mesh, MeshStandardMaterial, RingGeometry } from "three";
import { IAnimatable } from "../../../../animations/animations.interface";
import { Hoverable } from "../../../../behaviors/hoverable/hoverable.mixin";
import { Selectable } from "../../../../behaviors/selectable/selectable.mixin";
import { FieldBase } from "../common/base-field.game-object";
import { StrategyStack, StrategyStackItem, StrategyStackV2 } from "../../../../utils/strategy-stack/strategy-stack";


export class SimpleFieldObject
  extends Hoverable.mixin(Selectable.mixin(FieldBase))
  implements IAnimatable {
  
  public get animationSubject() { return this.mesh };
  protected get _object() { return this.mesh }

    
  private get _upperMesh() { return this._object.children[0] as Mesh<CylinderGeometry, MeshStandardMaterial> };
  private get _topMesh() { return this._object.children[1] as Mesh<RingGeometry, MeshStandardMaterial> };
  _strategyStack: StrategyStackV2;
  _hoverStrategyItem: () => void;
  _selectStrategyItem: () => void;
  _highlightStrategyItem: () => void;

  constructor(
    def: { auxId: string, auxCoords: string },
    public readonly mesh: Mesh<CylinderGeometry, MeshStandardMaterial>
  ) {
    super(def);
   const defaultColor = new Color("#000000");
    const hoverColor = new Color("#aa7600");
    const selectColor = new Color("#7e1cdb");
    const highlightColor = new Color("#5dc327");

    const defaultD = () => this.mesh.material.color = defaultColor;
    this._hoverStrategyItem = () => this.mesh.material.color = hoverColor;
    this._selectStrategyItem = () => this.mesh.material.color = selectColor;
    this._highlightStrategyItem = () => this.mesh.material.color = highlightColor;
    this._strategyStack = new StrategyStackV2(defaultD);
  }

  public init(): Mesh<CylinderGeometry, MeshStandardMaterial> {
    // this._object.castShadow = true;
    // this._object.receiveShadow = true;

    // this._upperMesh.position.y = 2.7;
    // this._upperMesh.castShadow = false;
    // this._upperMesh.receiveShadow = false;

    // this._topMesh.position.y = 3.2;
    // this._topMesh.rotateX(Math.PI / 180 * -90)
    // this._topMesh.rotateZ(Math.PI / 180 * 30);
    
    super.init();
    return this._object;   
  }

}