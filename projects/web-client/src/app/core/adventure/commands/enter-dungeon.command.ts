import { IEnterDungeonActivity } from "@game-logic/gameplay/modules/dungeon/activities/enter-dungeon/enter-dungeon.interface";
import { ENTER_DUNGEON_ACTIVITY } from "@game-logic/gameplay/modules/dungeon/dungeon.constants";
import { AdventureStateStore } from "../stores/adventure-state.store";
import { IMixinFactory } from "@game-logic/lib/infrastructure/mixin/mixin.interface";
import { Constructor } from "@game-logic/lib/infrastructure/extensions/types";
import { NotEnumerable } from "@game-logic/lib/infrastructure/extensions/object-traverser";
import { AdventureGameplay } from "../gameplay/adventure.gameplay";
import { IDungeonCrawler } from "@game-logic/gameplay/modules/dungeon/mixins/dungeon-crawler/dungeon-crawler.interface";
import { ICommand } from "../../game/interfaces/command.interface";
import { IActivitySubject } from "@game-logic/lib/base/activity/activity.interface";
import { IInteractableMedium } from "../../game-ui/mixins/interactable-medium/interactable-medium.interface";

export class EnterDungeonCommand implements IMixinFactory<any> {

  constructor(
  ) {}
  
  public isApplicable(a: IEnterDungeonActivity): boolean {
    return a.isActivity && a.id === ENTER_DUNGEON_ACTIVITY
  }

  public create(e: Constructor<IEnterDungeonActivity>): Constructor<any> {
    class Command extends e implements ICommand {

      isCommand = true as const;
      subject: IActivitySubject & IInteractableMedium

      constructor(d: unknown) {
        super(d);
      }
      onFinalization(): void {
      
      }

      public async indicate(adventureStateStore: AdventureStateStore): Promise<void> {
        
      }

      public async execute(adventureStateStore: AdventureStateStore): Promise<void> {
        const abandonTransaction = adventureStateStore.startTransaction();
        const pawn = adventureStateStore.currentState.getCurrentPlayerSelectedPawn<IDungeonCrawler>();
        try {
          super.doActivity(pawn)
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