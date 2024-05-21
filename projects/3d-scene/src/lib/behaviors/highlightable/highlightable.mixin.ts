import { StrategyStack, StrategyStackItem } from "../../utils/strategy-stack/strategy-stack";
import { BehaviorHolderClass, IBehaviorHolder } from "../behavior-holder.interface";
import { IHighlightable } from "./highlightable.interface";



export class Highlightable {

  public static mixin<T extends BehaviorHolderClass>(B: T)/** : T & IMixinBaseConstructor<IHighlightable> */{
    abstract class HighlightableBase extends B implements IHighlightable {
      readonly isHighlightable = true;
      public get isHighlighted(): boolean { return this._strategyStack.has(this._highlightStrategyItem) }

      abstract _strategyStack: StrategyStack;
      abstract _highlightStrategyItem: StrategyStackItem;
      
      highlight(): void {
        if (!this._highlightStrategyItem) {
          throw new Error("Highlight item is not defined");
        }
        this._strategyStack.addItem(this._highlightStrategyItem);
      }

      settle(): void {
        if (!this._highlightStrategyItem) {
          throw new Error("Highlight item is not defined");
        }
        this._strategyStack.removeItem(this._highlightStrategyItem);
      }
    }
    return HighlightableBase;
  }

  public static validate<T extends IBehaviorHolder & Partial<IHighlightable>>(o: T): T & IHighlightable | undefined {
    if (!('isHighlightable' in o) || !o.isHighlightable) {
      return;
    }
    return o as T & IHighlightable;
  }
}