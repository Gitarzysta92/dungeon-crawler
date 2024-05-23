import { IActivity, IActivityCost, IActivitySubject } from "../../../../base/activity/activity.interface";
import { NotEnumerable } from "../../../../infrastructure/extensions/object-traverser";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory, IMixin } from "../../../../infrastructure/mixin/mixin.interface";
import { IInventoryBearer } from "../../entities/bearer/inventory-bearer.interface";
import { IInventorySlot } from "../../entities/inventory-slot/inventory-slot.interface";
import { IEquipableItem } from "../../entities/item/item.interface";
import { EQUIP_ITEM_ACTIVITY } from "../../items.constants";

export class EquipItemActivityFactory implements IMixinFactory<IActivity> {

  constructor() { }

  public validate(a: IActivity): boolean {
    return a.isActivity && a.id === EQUIP_ITEM_ACTIVITY;
  }

  public create(c: Constructor<IMixin>): Constructor<IActivity> {
    class UnlockPerkActivity extends c implements IActivity {

      id = EQUIP_ITEM_ACTIVITY;
      isActivity = true as const;
      cost?: IActivityCost[];
      item: IEquipableItem | undefined;

      @NotEnumerable()
      subject: IActivitySubject;;;


      canPerform(bearer: IInventoryBearer): boolean {
        if (bearer.possessItem(this.item, 1)) {
          throw new Error("Actor do not posses given item in the inventory");
        }
        return true;
      }

      perform(bearer: IInventoryBearer, slot?: IInventorySlot): void {
        this.canPerform(bearer);
        this.item.equip(slot)
      }
    }

    return UnlockPerkActivity;
  }
}