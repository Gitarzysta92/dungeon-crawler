import { ISelectorDeclaration, ISelectorHandler } from "../../../../cross-cutting/selector/selector.interface";
import { Guid } from "../../../../infrastructure/extensions/types";
import { IInventoryBearer } from "../../entities/bearer/inventory-bearer.interface";
import { IEquipableItem, IItem, IPossesedItem } from "../../entities/item/item.interface";


export const ITEM_SELECTOR = "ITEM_SELECTOR";

export interface IItemSelectorPayload {
  inventoryBearer: IInventoryBearer;
  isEquipped?: boolean;
  itemId?: Guid;
}


export class ItemSelector implements ISelectorHandler<IItemSelectorPayload, IItem> {
  delegateId = ITEM_SELECTOR;

  isApplicableTo(d: ISelectorDeclaration<IItemSelectorPayload>): boolean {
    return d.delegateId === this.delegateId;
  }

  select(s: ISelectorDeclaration<IItemSelectorPayload>, d: IItem[]): IItem[] {
    return d.filter(i => {
      let isSelected = true;

      if (!i.isItem) {
        isSelected = false;
      }

      if (s.payload.inventoryBearer && !s.payload.inventoryBearer.possessItem(i.id, 1)) {
        isSelected = false;
      }

      if (s.payload.isEquipped === true && !(i as IEquipableItem).isEquipped) {
        isSelected = false;
      }

      if (s.payload.isEquipped === false && (i as IEquipableItem).isEquipped) {
        isSelected = false;
      }

      if (s.payload.itemId != null && s.payload.itemId !== i.id) {
        isSelected = false;
      }

      return isSelected;
    })
  }

}