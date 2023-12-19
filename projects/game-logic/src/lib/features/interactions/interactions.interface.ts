import { IItemSlotQuery } from "../items/inventory.interface";
import { CurrencyType } from "../items/items.constants";

export interface IUtilizationCost {
  costType: 'source' | 'majorAction' | 'minorAction' | 'moveAction',
  costValue: number;
}

export interface IInteraction {
  interactionType: InteractionType[] 
}

export interface IEquipable extends IInteraction {
  requiredSlots: IItemSlotQuery[];
  equipCost: IUtilizationCost[];
  isEquipped?: boolean;
}

export interface IDisposable extends IInteraction {
  utilizationCost: IUtilizationCost[];
  isDisposed?: boolean;
}

export interface IReusable extends IInteraction {
  utilizationCost: IUtilizationCost[];
  isUsed?: boolean;
}

export interface IPurchasable extends IInteraction {
  purchaseCurrency: CurrencyType;
  sellBasePrice: number;
  buyBasePrice: number;
}

export enum InteractionType {
  Equipable,
  Disposable,
  Reusable,
  Purchasable
}