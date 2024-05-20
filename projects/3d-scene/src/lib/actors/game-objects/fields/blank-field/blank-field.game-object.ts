import { CylinderGeometry, Mesh, MeshPhongMaterial } from "three";
import { FieldBase } from "../common/base-field.game-object";
import { Hoverable } from "../../../../behaviors/hoverable/hoverable.mixin";
import { Selectable } from "../../../../behaviors/selectable/selectable.mixin";
import { IAnimatable } from "../../../../animations/animations.interface";
import { StrategyStack, StrategyStackItem } from "../../../../utils/strategy-stack/strategy-stack";

export class BlankFieldObject
  extends Hoverable.mixin(Selectable.mixin(FieldBase))
  implements IAnimatable {
  
  public get animationSubject() { return this.mesh };
  
  _strategyStack: StrategyStack;
  _hoverStrategyItem: StrategyStackItem;
  _selectStrategyItem: StrategyStackItem;
  
  constructor(
    cfg: { auxId: string, auxCoords: string },
    public readonly mesh: Mesh<CylinderGeometry, MeshPhongMaterial>
  ) {
    super(cfg);
    this._strategyStack = new StrategyStack(new StrategyStackItem(() => null));
    this._hoverStrategyItem = new StrategyStackItem(() => null);
    this._selectStrategyItem = new StrategyStackItem(() => null);
  }

  public init(): Mesh<CylinderGeometry, MeshPhongMaterial> {
    super.init();
    return this._object as Mesh<CylinderGeometry, MeshPhongMaterial>;   
  }

}