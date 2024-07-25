
import { IActivity, IActivityCost, IActivitySubject } from "../../../../base/activity/activity.interface";
import { IGatheringController } from "../../../../cross-cutting/gatherer/data-gatherer.interface";
import { NotEnumerable } from "../../../../infrastructure/extensions/object-traverser";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixin, IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";

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

      @NotEnumerable()
      subject: IActivitySubject;


      canBeDone(bearer: IInventoryBearer): boolean {
        if (bearer.possessItem(this.item, 1)) {
          throw new Error("Actor do not posses given item in the inventory");
        }
        return true;
      }

      doActivity(bearer: IInventoryBearer, controller: IGatheringController): void {
        //from: IInventorySlot, to: IInventorySlot, amount?: number
        // this.canBeDispatched(bearer, from, to , amount);
        // this.item.associatedInventory.redistributeItems([{ from, to, amount: amount ?? from.stackSize }])
      }
    }

    return MoveItemActivity;
  }
}