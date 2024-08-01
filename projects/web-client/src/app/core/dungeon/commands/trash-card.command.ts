import { DungeonStateStore } from "../stores/dungeon-state.store";
import { IMixinFactory } from "@game-logic/lib/infrastructure/mixin/mixin.interface";
import { Constructor } from "@game-logic/lib/infrastructure/extensions/types";
import { ICommand } from "../../game/interfaces/command.interface";
import { TRASH_CARD_ACTIVITY } from "@game-logic/lib/modules/cards/cards.constants";
import { IProcedure } from "@game-logic/lib/base/procedure/procedure.interface";
import { IGatheringController } from "@game-logic/lib/cross-cutting/gatherer/data-gatherer.interface";
import { ITrashCardActivity } from "@game-logic/lib/modules/cards/activities/trash-card.activity";
import { IActivitySubject } from "@game-logic/lib/base/activity/activity.interface";
import { IInteractableMedium } from "../../game-ui/mixins/interactable-medium/interactable-medium.interface";
import { IDeckBearer } from "@game-logic/lib/modules/cards/entities/deck-bearer/deck-bearer.interface";
import { ProcedureExecutionPhase } from "@game-logic/lib/base/procedure/procedure.constants";


export class TrashCardCommand implements IMixinFactory<any> {
  
  isApplicable(a: IProcedure & ICommand): boolean {
    return a.isActivity && a.id === TRASH_CARD_ACTIVITY;
  }

  create(e: Constructor<ITrashCardActivity>): Constructor<ICommand> {
    class TrashCardCommand extends e implements ICommand {

      public subject: IActivitySubject & IInteractableMedium;
      public isCommand = true as const;

      constructor(d: unknown) {
        super(d);
      }
      onFinalization(): void {
     
      }

      public async indicate(s: DungeonStateStore): Promise<void> {}

      public async execute(s: DungeonStateStore, context: IGatheringController): Promise<void> {
        const abandonTransaction = s.startTransaction();
        const pawn = s.currentState.getCurrentPlayerSelectedPawn<IDeckBearer>()

        try {
          for await (let execution of super.doActivity(pawn, context)) {
            if (execution.executionPhaseType === ProcedureExecutionPhase.ExecutionFinished) {
              s.setState(s.currentState);
            }
          }
        } catch (e) {
          await abandonTransaction();
          throw e;
        }
      }

    }
    return TrashCardCommand;
  }
}