
import { IActivityCost, IActivitySubject } from "../../../../../lib/base/activity/activity.interface";
import { Constructor } from "../../../../../lib/infrastructure/extensions/types";
import { IMixinFactory, IMixin } from "../../../../../lib/infrastructure/mixin/mixin.interface";

import { IArea } from "../../../../../lib/modules/areas/entities/area/area.interface";
import { ENTER_DUNGEON_ACTIVITY } from "../../dungeon.constants";
import { IDungeonCrawler } from "../../dungeon.interface";
import { IDungeonArea } from "../../mixins/dungeon-area/dungeon-area.interface";
import { IEnterDungeonActivity } from "./enter-dungeon.interface";

export class EnterDungeonActivityFactory implements IMixinFactory<IEnterDungeonActivity> {


  public validate(a: IEnterDungeonActivity): boolean {
    return a.isActivity && a.id === ENTER_DUNGEON_ACTIVITY;
  }

  public create(c: Constructor<IMixin>): Constructor<IEnterDungeonActivity> {
    class EnterDungeonActivity extends c implements IEnterDungeonActivity {
      subject: IActivitySubject;
      perform2?(...args: unknown[]): AsyncGenerator<unknown, any, unknown> {
        throw new Error("Method not implemented.");
      }
      id: string;
      cost?: IActivityCost[];
      isActivity: true;


      public canPerform(c: IDungeonCrawler): boolean {
        const area = c.occupiedArea as IDungeonArea & IArea;
        if (!area) {
          throw new Error('')
        }
        return area.isDungeonArea;
      }
    
      public perform(c: IDungeonCrawler): void {
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