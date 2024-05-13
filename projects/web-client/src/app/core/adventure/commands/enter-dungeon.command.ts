import { Constructor } from "@game-logic/lib/extensions/types";
import { RoutingService } from "src/app/aspects/navigation/api";
import { IMixinFactory } from "@game-logic/lib/base/mixin/mixin.interface";
import { IEnterDungeonActivity } from "@game-logic/gameplay/modules/dungeon/activities/enter-dungeon/enter-dungeon.interface";
import { ENTER_DUNGEON_ACTIVITY } from "@game-logic/gameplay/modules/dungeon/dungeon.constants";
import { IHero } from "@game-logic/gameplay/modules/heroes/mixins/hero/hero.interface";
import { AdventureStateStore } from "../stores/adventure-state.store";

export class EnterDungeonCommand implements IMixinFactory<any> {

  constructor(
    private readonly _routingService: RoutingService
  ) {}
  
  public validate(a: IEnterDungeonActivity): boolean {
    return a.isActivity && a.id === ENTER_DUNGEON_ACTIVITY
  }

  public create(e: Constructor<IEnterDungeonActivity>): Constructor<any> {
    const routingService = this._routingService;
    class Command extends e {
      
      constructor(d: unknown) {
        super(d);
      }

      public async execute(h: IHero, adventureStateStore: AdventureStateStore): Promise<void> {
        const directive = await this.perform(h);
        await adventureStateStore.dispatch(directive as any);
        //routingService.navigateToDungeonInstance(adventureStateStore.currentState.visitedDungeon.id);
      }

    }
    return Command;
  }
}