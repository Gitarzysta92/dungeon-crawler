import { StrategyStack, StrategyStackItem, StrategyStackV2 } from "../../utils/strategy-stack/strategy-stack";
import { BehaviorHolderClass, IBehaviorHolder } from "../behavior-holder.interface";
import { ISelectable } from "./selectable.interface";


export class Selectable {

  public static mixin<T extends BehaviorHolderClass>(B: T)/** : T & IMixinBaseConstructor<ISelectable> */{
    abstract class SelectableBase extends B implements ISelectable {
      readonly isSelectable = true;
      public get isSelected(): boolean { return this._strategyStack.has(this._selectStrategyItem) }

      abstract _strategyStack: StrategyStackV2;
      abstract _selectStrategyItem: () => void;
      
      select(): void {
        if (!this._selectStrategyItem) {
          throw new Error("Hover item is not defined");
        }
        this._strategyStack.addItem(this._selectStrategyItem);
      }

      deselect(): void {
        if (!this._selectStrategyItem) {
          throw new Error("Hover item is not defined");
        }
        this._strategyStack.removeItem(this._selectStrategyItem);
      }
    }
    return SelectableBase;
  }

  public static validate<T extends IBehaviorHolder & Partial<ISelectable>>(o: T): T & ISelectable | undefined {
    if (!('isSelectable' in o) || !o.isSelectable) {
      return;
    }
    return o as T & ISelectable;
  }
}