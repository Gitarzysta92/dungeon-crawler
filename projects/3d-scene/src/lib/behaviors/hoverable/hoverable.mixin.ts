import { StrategyStack, StrategyStackItem, StrategyStackV2 } from "../../utils/strategy-stack/strategy-stack";
import { BehaviorHolderClass, IBehaviorHolder } from "../behavior-holder.interface";
import { IHoverable } from "./hoverable.interface";

export class Hoverable {

  public static mixin<T extends BehaviorHolderClass>(B: T) /** : T & IMixinBaseConstructor<IHoverable> & HoverableInternals */ {
    abstract class HoverableBase extends B implements IHoverable {
      readonly isHoverable = true;
      public get isHovered(): boolean { return this._strategyStack.has(this._hoverStrategyItem) }

      abstract _strategyStack: StrategyStackV2;
      abstract _hoverStrategyItem: () => void;
      
      hover(): void {
        if (!this._hoverStrategyItem) {
          throw new Error("Hover item is not defined");
        }
        this._strategyStack.addItem(this._hoverStrategyItem);
      }

      settle(): void {
        if (!this._hoverStrategyItem) {
          throw new Error("Hover item is not defined");
        }
        this._strategyStack.removeItem(this._hoverStrategyItem);
      }
    }
    return HoverableBase;
  }

  public static validate<T extends IBehaviorHolder & Partial<IHoverable>>(o: T): T & IHoverable | undefined {
    if (!('isHoverable' in o) || !o.isHoverable) {
      return;
    }
    return o as T & IHoverable;
  }
}