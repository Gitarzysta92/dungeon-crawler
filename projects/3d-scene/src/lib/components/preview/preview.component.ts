import { Material, Mesh } from "three";
import { IActor } from "../../actors/actor.interface";
import { IRotatable } from "../../behaviors/rotatable/rotatable.interface";

import { IRawVector3 } from "../../extensions/types/raw-vector3";
import { ActorsManager } from "../../actors/actors-manager";
import { CommonTileFactory } from "../../actors/game-objects/tokens/common-tile/common-tile.factory";

export class PreviewComponent {

  preview: IActor & Partial<IRotatable> | undefined;

  private _prevActor: IActor | undefined;
 
  constructor(
    private readonly _actorsManager: ActorsManager,
    private readonly _commonTileFactory: CommonTileFactory
  ) {  }

  public async show(a: IActor, position: IRawVector3) {
    position.y = 0.3;
    if (this._prevActor !== a) {
      if (this.preview) {
        this.preview.dispose();
      }
      const { userData, ...def } = (a as any).def;
      def.auxId = "B24B232B-9738-4DDF-9ACF-7FF23DCE0D46"
      this.preview = await this._commonTileFactory.create(def);
      this._actorsManager.initializeObject(this.preview);
      this._prevActor = a;
    }
    if (this.preview) {
      this.preview.object.visible = true;
      const mesh = this.preview.getMesh();
      this._setOpacity(mesh);
      mesh.position.set(position.x, position.y, position.z);
    }
  }

  public hide() {
    if (this.preview) {
      this.preview.object.visible = false;
    }
  }

  private _setOpacity(mesh: Mesh) {
    if (Array.isArray(mesh.material)) {
      mesh.material.forEach(m => {
        m.opacity = 0.5;
        m.transparent = true;
        m.needsUpdate = true;
      })
    } else if (mesh.material) {

      mesh.material.opacity = 0.5
      mesh.material.transparent = true;
      mesh.material.needsUpdate = true;
    }

    for (let child of mesh.children) {
      this._setOpacity(child as any);
    }
  }
  

}