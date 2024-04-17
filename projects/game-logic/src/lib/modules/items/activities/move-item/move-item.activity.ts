import { IActivity, IActivityCost } from "../../../../base/activity/activity.interface";
import { IMixinFactory, IMixin } from "../../../../base/mixin/mixin.interface";
import { Constructor } from "../../../../extensions/types";
import { IInventoryBearer } from "../../entities/bearer/inventory-bearer.interface";
import { IInventorySlot } from "../../entities/inventory-slot/inventory-slot.interface";
import { IEquipableItem } from "../../entities/item/item.interface";
import { MOVE_ITEM_ACTIVITY } from "../../items.constants";

export class MoveItemActivityFactory implements IMixinFactory<IActivity> {

  constructor() { }

  public validate(a: IActivity): boolean {
    return a.isActivity && a.id === MOVE_ITEM_ACTIVITY;
  }

  public create(c: Constructor<IMixin>): Constructor<IActivity> {
    class MoveItemActivity extends c implements IActivity {

      id = MOVE_ITEM_ACTIVITY;
      isActivity = true as const;
      cost?: IActivityCost[];
      item: IEquipableItem | undefined;

      validate(bearer: IInventoryBearer, from: IInventorySlot, to: IInventorySlot, amount?: number): boolean {
        if (bearer.possessItem(this.item, 1)) {
          throw new Error("Actor do not posses given item in the inventory");
        }
        return true;
      }

      perform(bearer: IInventoryBearer, from: IInventorySlot, to: IInventorySlot, amount?: number): void {
        this.validate(bearer, from, to , amount);
        this.item.associatedInventory.redistributeItems([{ from, to, amount: amount ?? from.stackSize }])
      }
    }

    return MoveItemActivity;
  }
}