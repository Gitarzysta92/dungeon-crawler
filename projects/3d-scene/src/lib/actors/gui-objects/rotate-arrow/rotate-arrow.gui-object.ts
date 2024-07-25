import { Mesh, MeshStandardMaterial, RingGeometry } from "three";
import { ActorBase } from "../../actor-base";

export class RotateArrowObject extends ActorBase {

  protected get _object() { return this.mesh }

  constructor(
    cfg: { auxId: string, auxCoords: string },
    public readonly mesh: Mesh<RingGeometry, MeshStandardMaterial>
  ) {
    super(cfg);
  }

  public init(): Mesh {
    super.init();
    return this._object;   
  }

  public clone() {
    return this;
  }
}