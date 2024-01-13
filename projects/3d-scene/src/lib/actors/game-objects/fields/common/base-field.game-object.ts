import { BufferGeometry, Material, Mesh, Vector3 } from "three";
import { ActorBase } from "../../../actor-base";
import { IAssignable } from "./field.interface";
import { ROTATION_ANGLES } from "../../../../behaviors/rotatable/rotatable.constants";

export abstract class FieldBase extends ActorBase {
  
  protected mesh!: Mesh<BufferGeometry, Material>;
  protected get _object() { return this.mesh };

  public takeBy(o: IAssignable): { coords: Vector3 } {
    o.takenFieldId = this.id;
    const coords = this._object.position.clone();
    if (this.mesh.geometry.boundingBox?.max) {
      coords.y = this.mesh.geometry.boundingBox.max.y;
    } else {
      coords.y = this.mesh.position.y;
    }
    return { coords };
  }

  public setRandomRotation() {
    const { x, y, z, w } = ROTATION_ANGLES[Math.floor(Math.random() * 5) as keyof typeof ROTATION_ANGLES];
    this.object.quaternion.set(x, y, z, w);
  }
}