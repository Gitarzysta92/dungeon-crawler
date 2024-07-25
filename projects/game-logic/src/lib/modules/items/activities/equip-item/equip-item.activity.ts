import { IActivity, IActivityCost, IActivitySubject } from "../../../../base/activity/activity.interface";
import { IGatheringController } from "../../../../cross-cutting/gatherer/data-gatherer.interface";
import { NotEnumerable } from "../../../../infrastructure/extensions/object-traverser";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory, IMixin } from "../../../../infrastructure/mixin/mixin.interface";
import { IInventoryBearer } from "../../entities/bearer/inventory-bearer.interface";
import { IEquipableItem } from "../../entities/item/item.interface";
import { EQUIP_ITEM_ACTIVITY } from "../../items.constants";

export class EquipItemActivityFactory implements IMixinFactory<IActivity> {

  constructor() { }

  public isApplicable(a: IActivity): boolean {
    return a.isActivity && a.id === EQUIP_ITEM_ACTIVITY;
  }

  public create(c: Constructor<IMixin>): Constructor<IActivity> {
    class EquipItemActivity extends c implements IActivity {

      id = EQUIP_ITEM_ACTIVITY;
      isActivity = true as const;
      cost?: IActivityCost[];
      item: IEquipableItem | undefined;

      @NotEnumerable()
      subject: IActivitySubject;;;


      canBeDone(bearer: IInventoryBearer): boolean {
        if (bearer.possessItem(this.item, 1)) {
          throw new Error("Actor dont have given item in the inventory");
        }
        return true;
      }

      doActivity(bearer: IInventoryBearer, controller: IGatheringController): void {

        // toSlot: IInventorySlot, fromSlot: IInventorySlot
        // this.canBeDispatched(bearer);
        // this.item.equip(toSlot, fromSlot);
      }
    }

    return EquipItemActivity;
  }
}