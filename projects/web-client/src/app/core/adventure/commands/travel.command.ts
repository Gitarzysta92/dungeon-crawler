import { BOARD_TRAVEL_ACTIVITY } from "@game-logic/gameplay/modules/board-areas/board-areas.constants";
import { IHero } from "@game-logic/gameplay/modules/heroes/mixins/hero/hero.interface";
import { IMixinFactory } from "@game-logic/lib/base/mixin/mixin.interface";
import { Constructor } from "@game-logic/lib/extensions/types";
import { AdventureStateStore } from "../stores/adventure-state.store";
import { IActivity } from "@game-logic/lib/base/activity/activity.interface";

export class TravelCommandFactory implements IMixinFactory<any> {

  constructor() {}
  
  public validate(a: any): boolean {
    return a.isActivity && a.id === BOARD_TRAVEL_ACTIVITY
  }

  public create(e: Constructor<IActivity>): Constructor<any> {
    class Command extends e {
      
      constructor(d: unknown) {
        super(d);
      }

      public async canPerform(h: IHero, adventureStateStore: AdventureStateStore): Promise<boolean> {
        return super.canPerform(h)
      }

      public async perform(h: IHero, adventureStateStore: AdventureStateStore): Promise<void> {
        const directive = await super.perform(h);
        await adventureStateStore.dispatch(directive as any);
      }

    }
    return Command;
  }
}