import { Mesh, MeshStandardMaterial, ExtrudeGeometry, Vector3, BoxGeometry, ExtrudeGeometryOptions, Shape, WireframeGeometry, LineSegments, Group } from "three";
import { ActorBase } from "../../actor-base";
import { IMoveArrowDefinition } from "./move-arrow.interface";

export class MoveArrowObject extends ActorBase {

  protected get _object() { return this.mesh }

  constructor(
    cfg: { auxId: string, auxCoords: string },
    public readonly mesh: Mesh<BoxGeometry, MeshStandardMaterial>
  ) {
    super(cfg);
    this.auxId = cfg.auxId;
  }

  public init(): Mesh {
    super.init();
    return this._object;   
  }
}