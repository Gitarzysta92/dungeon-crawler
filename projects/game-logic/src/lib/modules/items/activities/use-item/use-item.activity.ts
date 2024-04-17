import { IActivity, IActivityCost } from "../../../../base/activity/activity.interface";
import { IMixinFactory, IMixin } from "../../../../base/mixin/mixin.interface";
import { Constructor } from "../../../../extensions/types";
import { IEquipableItem } from "../../entities/item/item.interface";
import { USE_ITEM_ACTIVITY } from "../../items.constants";


export class UseItemActivityFactory implements IMixinFactory<IActivity> {

  constructor() { }

  public validate(a: IActivity): boolean {
    return a.isActivity && a.id === USE_ITEM_ACTIVITY;
  }

  public create(c: Constructor<IMixin>): Constructor<IActivity> {
    class UseItemActivity extends c implements IActivity {

      id = USE_ITEM_ACTIVITY;
      isActivity = true as const;
      cost?: IActivityCost[];
      item: IEquipableItem | undefined;

      validate(): boolean {
        return false;
      }

      perform(): void {
      }
    }

    return UseItemActivity;
  }
}