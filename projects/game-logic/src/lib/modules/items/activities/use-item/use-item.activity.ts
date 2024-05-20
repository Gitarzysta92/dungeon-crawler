import { IActivity, IActivityCost, IActivitySubject } from "../../../../base/activity/activity.interface";
import { IMixinFactory, IMixin } from "../../../../base/mixin/mixin.interface";
import { NotEnumerable } from "../../../../extensions/object-traverser";
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

      @NotEnumerable()
      subject: IActivitySubject;;;


      canPerform(): boolean {
        return false;
      }

      perform(): void {
      }
    }

    return UseItemActivity;
  }
}