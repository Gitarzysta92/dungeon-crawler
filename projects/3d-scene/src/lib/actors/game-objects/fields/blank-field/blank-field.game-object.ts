import { Color, CylinderGeometry, Mesh, MeshPhongMaterial } from "three";
import { FieldBase } from "../common/base-field.game-object";
import { Hoverable } from "../../../../behaviors/hoverable/hoverable.mixin";
import { Selectable } from "../../../../behaviors/selectable/selectable.mixin";
import { IAnimatable } from "../../../../animations/animations.interface";
import { StrategyStackV2 } from "../../../../utils/strategy-stack/strategy-stack";

export class BlankFieldObject
  extends Hoverable.mixin(Selectable.mixin(FieldBase))
  implements IAnimatable {
  
  public get animationSubject() { return this.mesh };
  
  _strategyStack: StrategyStackV2;
  _hoverStrategyItem: () => void;
  _selectStrategyItem: () => void;
  _highlightStrategyItem: () => void;
  
  constructor(
    cfg: { auxId: string, auxCoords: string },
    public readonly mesh: Mesh<CylinderGeometry, MeshPhongMaterial>
  ) {
    super(cfg);
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

  public init(): Mesh<CylinderGeometry, MeshPhongMaterial> {
    super.init();
    return this._object as Mesh<CylinderGeometry, MeshPhongMaterial>;   
  }

}