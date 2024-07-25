import { IActivityCost, IActivitySubject } from "../../../../../lib/base/activity/activity.interface";
import { Constructor } from "../../../../../lib/infrastructure/extensions/types";
import { IMixinFactory, IMixin } from "../../../../../lib/infrastructure/mixin/mixin.interface";
import { IArea } from "../../../../../lib/modules/areas/entities/area/area.interface";
import { LEAVE_DUNGEON_ACTIVITY } from "../../dungeon.constants";
import { IDungeonArea } from "../../mixins/dungeon-area/dungeon-area.interface";
import { IDungeonCrawler } from "../../mixins/dungeon-crawler/dungeon-crawler.interface";
import { IEnterDungeonActivity } from "../enter-dungeon/enter-dungeon.interface";

export class LeaveDungeonActivityFactory implements IMixinFactory<IEnterDungeonActivity> {

  constructor() { }

  public isApplicable(a: IEnterDungeonActivity): boolean {
    return a.isActivity && a.id === LEAVE_DUNGEON_ACTIVITY;
  }

  public create(c: Constructor<IMixin>): Constructor<IEnterDungeonActivity> {
    class EnterDungeonActivity extends c implements IEnterDungeonActivity {
      subject: IActivitySubject;

      id: string;
      cost?: IActivityCost[];
      isActivity: true;


      public canBeDone(c: IDungeonCrawler): boolean {
        const area = c.occupiedArea as IDungeonArea & IArea;
        if (!area) {
          throw new Error('')
        }
        return area.isDungeonArea;
      }
    
      public doActivity(c: IDungeonCrawler): void {
        // return async () => {
    
        //   this.validate(c);
        //   c.visitedDungeonId = this._dungeonArea.id;
        
        //   return {
        //     payload: null,
        //     signature: { id: this.id }
        //   } as IActivityDeclaration
        // } 
      }
    }
    return EnterDungeonActivity;
  } 
}
