import { IUtilizationCost } from "../features/action/actions.interface";
import { ActorType } from "../features/actors/actor.constants";
import { IItemSlotQuery } from "../features/items/inventory.interface";
import { CurrencyType } from "../features/items/items.constants";


export interface IInteraction {
  interactionType: InteractionType[]
}

export interface IEquipable extends IInteraction {
  requiredSlots: IItemSlotQuery[];
  equipCost: IUtilizationCost[];
  isEquipped?: boolean;
}

export interface IDisposable extends IInteraction {
  targetType: ActorType;
  utilizationCost: IUtilizationCost[];
}

export interface IUsable extends IInteraction {
  targetType: ActorType;
  useCost: IUtilizationCost[];
}

export interface IPurchasable extends IInteraction {
  purchaseCurrency: CurrencyType;
  sellBasePrice: number;
  buyBasePrice: number;
}

export enum InteractionType {
  Equipable,
  Disposable,
  Usable,
  Purchasable
}