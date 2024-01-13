import { CylinderGeometry, Mesh, MeshStandardMaterial, RingGeometry } from "three";
import { IAnimatable } from "../../../../animations/animations.interface";
import { Hoverable } from "../../../../behaviors/hoverable/hoverable.mixin";
import { Selectable } from "../../../../behaviors/selectable/selectable.mixin";
import { FieldBase } from "../common/base-field.game-object";
import { StrategyStack, StrategyStackItem } from "../../../../utils/strategy-stack/strategy-stack";


export class SimpleFieldObject
  extends Hoverable.mixin(Selectable.mixin(FieldBase))
  implements IAnimatable {
  
  public get animationSubject() { return this.mesh };
  protected get _object() { return this.mesh }

    
  private get _upperMesh() { return this._object.children[0] as Mesh<CylinderGeometry, MeshStandardMaterial> };
  private get _topMesh() { return this._object.children[1] as Mesh<RingGeometry, MeshStandardMaterial> };
  _strategyStack: StrategyStack;
  _hoverStrategyItem: StrategyStackItem;
  _selectStrategyItem: StrategyStackItem;

  constructor(
    def: { auxId: string },
    public readonly mesh: Mesh<CylinderGeometry, MeshStandardMaterial>
  ) {
    super(def.auxId);
    this._strategyStack = new StrategyStack(new StrategyStackItem(() => null));
    this._hoverStrategyItem = new StrategyStackItem(() => null);
    this._selectStrategyItem = new StrategyStackItem(() => null);
  }

  public init(): Mesh<CylinderGeometry, MeshStandardMaterial> {
    this._object.castShadow = true;
    this._object.receiveShadow = true;

    this._upperMesh.position.y = 2.7;
    this._upperMesh.castShadow = false;
    this._upperMesh.receiveShadow = false;

    this._topMesh.position.y = 3.2;
    this._topMesh.rotateX(Math.PI / 180 * -90)
    this._topMesh.rotateZ(Math.PI / 180 * 30);
    
    super.init();
    return this._object;   
  }

}