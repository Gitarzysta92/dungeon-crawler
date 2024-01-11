import { Group, Object3D } from "three";
import { ROTATION_ANGLES } from "../../../../behaviors/rotatable/rotatable.constants";
import { IMixinBaseConstructor } from "../../../../utils/mixin-composer/mixin-composer.interface";


export interface IOutletHolder {
  isOutletHolder: boolean;
}

export class OutletHolder {
  public static mixin<T extends IMixinBaseConstructor<any>>(B: T) /** : T & IMixinBaseConstructor<IRotatable> */  {
    abstract class OutletHolderBase extends B implements IOutletHolder {
      isOutletHolder = true;

      areInitialized = false;
      
      abstract _outletMeshProvider: () => Group;
      abstract get _holder(): Object3D;

      public updateOutlets(activeOutlets: (keyof typeof ROTATION_ANGLES)[]): void {
        for (let ao of activeOutlets) {
          const outletMesh = this._outletMeshProvider();
          outletMesh.rotation.setFromQuaternion(ROTATION_ANGLES[ao]);
          this._holder.add(outletMesh);
        } 
      }
    }
    return OutletHolderBase;
  }

  public static validate<T extends object>(o: T & Partial<IOutletHolder>): T & IOutletHolder | undefined {
    if (!('isOutletHolder' in o) || !o.isOutletHolder) {
      return;
    }
    return o as T & IOutletHolder;
  }
}
