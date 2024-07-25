import { IActivityCost, IActivityDeclaration } from "../../../../../lib/base/activity/activity.interface";
import { NotEnumerable } from "../../../../../lib/infrastructure/extensions/object-traverser";
import { Constructor } from "../../../../../lib/infrastructure/extensions/types";
import { IMixinFactory, IMixin } from "../../../../../lib/infrastructure/mixin/mixin.interface";
import { ENTER_DUNGEON_ACTIVITY } from "../../dungeon.constants";
import { IDungeonArea } from "../../mixins/dungeon-area/dungeon-area.interface";
import { IDungeonCrawler } from "../../mixins/dungeon-crawler/dungeon-crawler.interface";
import { IEnterDungeonActivity } from "./enter-dungeon.interface";

export class EnterDungeonActivityFactory implements IMixinFactory<IEnterDungeonActivity> {

  constructor() {}

  public isApplicable(a: IEnterDungeonActivity): boolean {
    return a.isActivity && a.id === ENTER_DUNGEON_ACTIVITY;
  }

  public create(c: Constructor<IMixin>): Constructor<IEnterDungeonActivity> {
    class EnterDungeonActivity extends c implements IEnterDungeonActivity {

      id: string;
      cost?: IActivityCost[];
      isActivity = true as const;

      @NotEnumerable()
      subject: IDungeonArea;

      constructor(d: IActivityDeclaration) {
        super(d);
        this.id = d.id;
        this.cost = d.cost ?? [];
      }


      public canBeDone(c: IDungeonCrawler): boolean {
        return true;
      }

      public doActivity(c: IDungeonCrawler): void {
        return c.enterDungeon(this.subject)
      }
  
    }
    return EnterDungeonActivity;
  } 
}