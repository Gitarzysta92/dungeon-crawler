import { Quaternion, Vector3 } from "three";
import { ROTATION_ANGLES } from "./rotatable.constants";
import { IRotatable } from "./rotatable.interface";
import { BehaviorHolderClass, IBehaviorHolder } from "../behavior-holder.interface";


export class Rotatable {
  // TODO : try use symbols instead of plain names, to avoid property overwriting.
  // public static readonly _rotation = Symbol("rotation");
  // public static readonly _q = Symbol("rotation-quaternion");
  // public static readonly _v = Symbol("rotation-axis-vector");

  public static mixin<T extends BehaviorHolderClass>(B: T) /** : T & IMixinBaseConstructor<IRotatable> */  {
    abstract class RotatableBase extends B implements IRotatable {
      readonly isRotatable = true;
      
      _q = new Quaternion();
      _v = new Vector3(0, 1, 0).normalize();
      _rotation: keyof typeof ROTATION_ANGLES = 0;

      async rotateAsync(r: keyof typeof ROTATION_ANGLES): Promise<void> {
        this.setRotation(this.getActualRotation(r));
      };
  
      rotate(r: keyof typeof ROTATION_ANGLES): void {
        this.setRotation(this.getActualRotation(r));
      };
  
      setRotation(q: Quaternion | keyof typeof ROTATION_ANGLES): void {
        if (!(q instanceof Quaternion)) {
          q = ROTATION_ANGLES[q];
        } 
        const { x, y, z, w } = q;
        this.object.quaternion.set(x, y, z, w);
      }
  
      getActualRotation(rotation: keyof typeof ROTATION_ANGLES): Quaternion {
        if (this._rotation === rotation) {
          return this.object.quaternion;
        }
  
        const multiplier = Math.abs(rotation - this._rotation);
        const oq = this._q.clone().setFromAxisAngle(this._v, (Math.PI / 3) * multiplier);
    
        if (rotation > this._rotation) {
          oq.invert();
        }
    
        this._rotation = rotation;
        return oq.multiply(this.object.quaternion);
      } 
    }
    return RotatableBase;
  }

  public static validate<T extends IBehaviorHolder & Partial<IRotatable>>(o: T): T & IRotatable | undefined {
    if (!('isRotatable' in o) || !o.isRotatable) {
      return;
    }
    return o as T & IRotatable;
  }
}
