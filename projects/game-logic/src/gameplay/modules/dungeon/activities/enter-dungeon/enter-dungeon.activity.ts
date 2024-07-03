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

  public validate(a: IEnterDungeonActivity): boolean {
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


      public canBePerformed(c: IDungeonCrawler): boolean {
        return c.visitedDungeon === this.subject;
      }

      public async *perform2(c: IDungeonCrawler): AsyncGenerator<unknown, any, unknown> {
        return c.enterDungeon(this.subject)
      }
    
      public perform(c: IDungeonCrawler): void {}
    }
    return EnterDungeonActivity;
  } 
}