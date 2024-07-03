import { IEnterDungeonActivity } from "@game-logic/gameplay/modules/dungeon/activities/enter-dungeon/enter-dungeon.interface";
import { ENTER_DUNGEON_ACTIVITY } from "@game-logic/gameplay/modules/dungeon/dungeon.constants";
import { AdventureStateStore } from "../stores/adventure-state.store";
import { IMixinFactory } from "@game-logic/lib/infrastructure/mixin/mixin.interface";
import { Constructor } from "@game-logic/lib/infrastructure/extensions/types";
import { NotEnumerable } from "@game-logic/lib/infrastructure/extensions/object-traverser";
import { IAdventureGameplayState } from "../interfaces/adventure-gameplay-state.interface";
import { DungeonBuilder } from "@game-logic/gameplay/modules/dungeon/builder/dungeon.builder";

export class EnterDungeonCommand implements IMixinFactory<any> {

  constructor(
  ) {}
  
  public validate(a: IEnterDungeonActivity): boolean {
    return a.isActivity && a.id === ENTER_DUNGEON_ACTIVITY
  }

  public create(e: Constructor<IEnterDungeonActivity>): Constructor<any> {
    class Command extends e {
      
      @NotEnumerable()
      isEnterDungeonCommand = true as const;

      constructor(d: unknown) {
        super(d);
      }

      public async indicate(state: IAdventureGameplayState): Promise<void> {
        
      }

      public async execute(adventureStateStore: AdventureStateStore): Promise<void> {
        const abandonTransaction = adventureStateStore.startTransaction();
        const pawn = adventureStateStore.currentState.getSelectedPawn();
        try {
          for await (let _ of super.perform2(pawn)) {}
          adventureStateStore.setState(adventureStateStore.currentState);
        } catch (e) {
          abandonTransaction();
          throw e;
        }
      }
    }
    return Command;
  }
}