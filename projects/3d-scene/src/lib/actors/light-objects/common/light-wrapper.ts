import { Light } from "three";
import { ActorBase } from "../../actor-base";

export class LightWrapper<T extends Light = Light> extends ActorBase {

  constructor(
    def: { auxId: string },
    protected readonly _object: T
  ) {
    super(def.auxId)
  }

  public update(): void {
    this._object.updateMatrix();
    this._object.updateMatrixWorld();
    if (this._object.shadow) {
      this._object.shadow.needsUpdate = true;
    }
  }

  public allowShadowMapAutoUpdate() {
    if (this._object.shadow) {
      this._object.shadow.autoUpdate = true;
    }
  }

  public preventShadowMapAutoUpdate() {
    if (this._object.shadow) {
      this._object.shadow.autoUpdate = false;
      this._object.shadow.needsUpdate = true;
    }
  }

}