import { Mesh, CylinderGeometry, Color, ShapeGeometry } from "three";
import { ActorBase } from "../../actor-base";
import { Hoverable } from "../../../behaviors/hoverable/hoverable.mixin";
import { Selectable } from "../../../behaviors/selectable/selectable.mixin";
import { StrategyStackV2 } from "../../../utils/strategy-stack/strategy-stack";

export class RotateControlObject extends Hoverable.mixin(Selectable.mixin(ActorBase)) {

  protected get _object() { return this.mesh }
  _strategyStack: StrategyStackV2;
  _hoverStrategyItem: () => void;
  _selectStrategyItem: () => void;
  _highlightStrategyItem: () => void;

  constructor(
    cfg: any,
    public readonly mesh: Mesh<ShapeGeometry, any>
  ) {
    super({ auxId: "string", auxCoords: "string" });
    const defaultColor = new Color(this.mesh.material.color);
    const hoverColor = new Color("#aa7600");
    const selectColor = new Color("#7e1cdb");
    const highlightColor = new Color("#5dc327");

    const defaultD = () => this.mesh.material.color = defaultColor;
    this._hoverStrategyItem = () => this.mesh.material.color = hoverColor;
    this._selectStrategyItem = () => this.mesh.material.color = selectColor;
    this._highlightStrategyItem = () => this.mesh.material.color = highlightColor;
    this._strategyStack = new StrategyStackV2(defaultD);
  }

  public init(): Mesh {
    super.init();
    return this._object;   
  }

  public clone() {
    return this;
  }

  has(i: any): boolean { 
    return true;
  }
}