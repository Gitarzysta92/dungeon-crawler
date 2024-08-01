import { IActivitySubject } from "@game-logic/lib/base/activity/activity.interface";
import { IGatheringController } from "@game-logic/lib/cross-cutting/gatherer/data-gatherer.interface";
import { Constructor } from "@game-logic/lib/infrastructure/extensions/types";
import { IMixinFactory } from "@game-logic/lib/infrastructure/mixin/mixin.interface";
import { IStartTurnActivity } from "@game-logic/lib/modules/turn-based-gameplay/activities/start-turn.activity";
import { FINISH_TURN_ACTIVITY, START_TURN_ACTIVITY } from "@game-logic/lib/modules/turn-based-gameplay/turn-based-gameplay.constants";
import { IInteractableMedium } from "../../game-ui/mixins/interactable-medium/interactable-medium.interface";
import { ICommand } from "../../game/interfaces/command.interface";
import { DungeonStateStore } from "../stores/dungeon-state.store";
import { IFinishTurnActivity } from "@game-logic/lib/modules/turn-based-gameplay/activities/finish-turn.activity";

export class FinishTurnCommand implements IMixinFactory<any> {
  
  isApplicable(a: IFinishTurnActivity): boolean {
    return a.isActivity && a.id === FINISH_TURN_ACTIVITY;
  }

  create(e: Constructor<IFinishTurnActivity>): Constructor<ICommand> {
    class FinishTurnCommand extends e implements ICommand {

      public isCommand = true as const;
      public subject: IActivitySubject & IInteractableMedium
      
      constructor(d: unknown) {
        super(d);
      }

      public onFinalization(): void { }

      public async indicate(s: DungeonStateStore): Promise<void> { }

      public async execute(
        s: DungeonStateStore,
        controller: IGatheringController
      ): Promise<void> {
        const abandonTransaction = s.startTransaction();
        try {
          await this.doActivity()
          s.setState(s.currentState);
        } catch (e) {
          abandonTransaction()
          throw e;
        }
      }
    }
    return FinishTurnCommand;
  }
}
