import { Vector3 } from "three";
import { BehaviorHolderClass, IBehaviorHolder } from "../behavior-holder.interface";
import { IMovable } from "./movable.interface";
import { IRawVector3 } from "../../extensions/types/raw-vector3";



export class Movable {
  // TODO : try use symbols instead of plain names, to avoid property overwriting.
  //public static readonly _initialPosition: unique symbol = Symbol("initial-position");

  public static mixin<T extends BehaviorHolderClass>(B: T) /** : T & IMixinBaseConstructor<IMovable> */ {
    abstract class MovableBase extends B implements IMovable {
      readonly isMovable = true;

      _initialPosition: Vector3 | undefined;

      async moveAsync(p: Vector3 | IRawVector3): Promise<void> {
        if (!this.validateMove(p)) {
          return;
        }
        this.setPosition(p);
      }

      public move(p: Vector3 | IRawVector3): void {
        this.setPosition(p)
      }

      public setPosition(p: Vector3 | IRawVector3): void {
        this.object.position.set(p.x, p.y, p.z);

        if (!this._initialPosition) {
          this._initialPosition = this.object.position;
        }
      }

      public validateMove(p: Vector3 | IRawVector3): boolean {
        return !(this.object.position?.x === p.x && this.object.position?.y === p.y && this.object.position?.z === p.z)
      }
    }
    return MovableBase;
  }


  public static validate<T extends IBehaviorHolder & Partial<IMovable>>(o: T): T & IMovable | undefined {
    if (!('isMovable' in o) || !o.isMovable) {
      return;
    }
    return o as T & IMovable;
  }
}