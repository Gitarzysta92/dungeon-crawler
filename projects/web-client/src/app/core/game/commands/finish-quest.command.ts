import { FINISH_QUEST_ACTIVITY } from "@game-logic/lib/modules/quest/quest.constants";
import { IGame } from "../interfaces/game.interface";
import { NotEnumerable } from "@game-logic/lib/infrastructure/extensions/object-traverser";
import { Constructor } from "@game-logic/lib/infrastructure/extensions/types";
import { IMixinFactory } from "@game-logic/lib/infrastructure/mixin/mixin.interface";
import { ICommand } from "../interfaces/command.interface";
import { IQuestOrigin } from "@game-logic/lib/modules/quest/entities/quest-origin/quest-origin.interface";
import { IInteractableMedium } from "../../game-ui/mixins/interactable-medium/interactable-medium.interface";
import { IFinishQuestActivity } from "@game-logic/lib/modules/quest/activities/finish-quest/finish-quest.interface";
import { IGameStore } from "../interfaces/game-store.interface";

export class FinishQuestCommandFactory implements IMixinFactory<ICommand> {

  constructor() {}
  
  public validate(a: IFinishQuestActivity & ICommand): boolean {
    return a.isActivity && a.id === FINISH_QUEST_ACTIVITY
  }

  public create(e: Constructor<IFinishQuestActivity & ICommand>): Constructor<ICommand> {
    
    class FinishQuestCommand extends e implements ICommand {
      
      @NotEnumerable()
      isFinishQuestCommand = true as const;

      constructor(d: unknown) {
        super(d);
      }

      public async indicate(state: IGameStore): Promise<void> {
        const origin = super.quest.origin.deref() as IQuestOrigin & IInteractableMedium;
        if (origin) {
          origin.isHighlighted = true;
        }
      }

      public async execute(stateStore: any): Promise<void> {
        const abandonTransaction = stateStore.startTransaction();
        const pawn = stateStore.currentState.getSelectedPawn();
        try {
          for await (let segment of super.dispatch2(pawn)) {
          }
        } catch (e) {
          abandonTransaction();
          throw e;
        }
        stateStore.setState(stateStore.currentState);
      }
    }
    return FinishQuestCommand;
  }
}
