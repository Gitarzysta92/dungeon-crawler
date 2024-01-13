import { Mesh, MeshStandardMaterial, RingGeometry } from "three";
import { ActorBase } from "../../actor-base";

export class RotateArrowObject extends ActorBase {

  protected get _object() { return this.mesh }

  constructor(
    cfg: { auxId: string },
    public readonly mesh: Mesh<RingGeometry, MeshStandardMaterial>
  ) {
    super(cfg.auxId);
  }

  public init(): Mesh {
    super.init();
    return this._object;   
  }
}