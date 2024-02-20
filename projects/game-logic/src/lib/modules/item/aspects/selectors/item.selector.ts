import { IDelegateDeclaration } from "../../../../base/delegate/delegate.interface";
import { ISelectorDefaultPayload, ISelectorHandler } from "../../../../cross-cutting/selector/selector.interface";
import { Guid } from "../../../../extensions/types";
import { IInventoryBearer } from "../../bearer/inventory-bearer.interface";
import { Item } from "../../item";

export const ITEM_SELECTOR_IDENTIFIER = "ITEM_SELECTOR_IDENTIFIER";

export interface IItemSelectorPayload extends ISelectorDefaultPayload {
  inventoryBearer: IInventoryBearer;
  isEquipped?: boolean;
  itemId?: Guid;
}


export class ItemSelector implements ISelectorHandler<IItemSelectorPayload, Item> {
  delegateId = ITEM_SELECTOR_IDENTIFIER;

  select: (s: ISelectorDefaultPayload, d: unknown[]) => Item[];
  isApplicableTo: (d: IDelegateDeclaration<IItemSelectorPayload>) => boolean;
  prepare: (ctx: unknown, d: IItemSelectorPayload) => IItemSelectorPayload;
}