import { Vector3 } from "three";
import { BehaviorHolderClass, IBehaviorHolder } from "../behavior-holder.interface";
import { IMovable } from "./movable.interface";



export class Movable {
  // TODO : try use symbols instead of plain names, to avoid property overwriting.
  //public static readonly _initialPosition: unique symbol = Symbol("initial-position");

  public static mixin<T extends BehaviorHolderClass>(B: T) /** : T & IMixinBaseConstructor<IMovable> */ {
    abstract class MovableBase extends B implements IMovable {
      readonly isMovable = true;

      _initialPosition: Vector3 | undefined;

      async moveAsync(p: Vector3): Promise<void> {
        this.setPosition(p);
      }

      move(p: Vector3): void {
        this.setPosition(p)
      }

      setPosition(p: Vector3): void {
        this.object.position.set(p.x, p.y, p.z);

        if (!this._initialPosition) {
          this._initialPosition = this.object.position;
        }
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