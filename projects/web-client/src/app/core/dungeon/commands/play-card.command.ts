import { DungeonStateStore } from "../stores/dungeon-state.store";
import { IMixinFactory } from "@game-logic/lib/infrastructure/mixin/mixin.interface";
import { Constructor } from "@game-logic/lib/infrastructure/extensions/types";
import { ICommand } from "../../game/interfaces/command.interface";
import { PLAY_CARD_ACTIVITY } from "@game-logic/lib/modules/cards/cards.constants";
import { IGatheringController, IGatheringDataProcedureStepDeclaration } from "@game-logic/lib/cross-cutting/gatherer/data-gatherer.interface";
import { IPlayCardActivity } from "@game-logic/lib/modules/cards/activities/play-card.activity";
import { IDeckBearer } from "@game-logic/lib/modules/cards/entities/deck-bearer/deck-bearer.interface";
import { IActivitySubject } from "@game-logic/lib/base/activity/activity.interface";
import { IInteractableMedium } from "../../game-ui/mixins/interactable-medium/interactable-medium.interface";
import { IProcedureExecutionStatus } from "@game-logic/lib/base/procedure/procedure.interface";
import { ProcedureExecutionPhase } from "@game-logic/lib/base/procedure/procedure.constants";
import { IMakeActionProcedureStepDeclaration } from "@game-logic/lib/cross-cutting/action/action.interface";
import { ICardOnPile } from "@game-logic/lib/modules/cards/entities/card-on-pile/card-on-pile.interface";

export interface IPlayCardCommand extends ICommand {
  playCardCommandProcedureCache: Map<IInteractableMedium, IInteractableMedium>;
}



export class PlayCardCommand implements IMixinFactory<IPlayCardCommand> {
  
  public static isPlayCardCommand(a: any): boolean {
    return a.isActivity && a.id === PLAY_CARD_ACTIVITY;
  }
  
  public static asPlayCardCommand<T>(data: T): T & IPlayCardCommand {
    if (!this.isPlayCardCommand(data)) {
      throw new Error("Provided data is not a PlayCardCommand");
    } 
    return data as IPlayCardCommand & T;
  }


  public isApplicable(a: IPlayCardCommand): boolean {
    return a.isActivity && a.id === PLAY_CARD_ACTIVITY;
  }

  public create(e: Constructor<IPlayCardActivity>): Constructor<IPlayCardCommand> {
    class PlayCardCommand extends e implements IPlayCardCommand {

      public isCommand = true as const; 
      public subject: IActivitySubject & IInteractableMedium & ICardOnPile;
      public preventAutofinalization = true;
      public playCardCommandProcedureCache: Map<IInteractableMedium, IInteractableMedium>;
      
      constructor(d: unknown) {
        super(d);
        Object.defineProperty(this, 'playCardCommandProcedureCache', { value: new Map(), enumerable: true })
      }

      public onFinalization(): void {}

      public async indicate(s: DungeonStateStore): Promise<void> {}

      public async execute(
        s: DungeonStateStore,
        controller: IGatheringController
      ): Promise<void> {
        const abandonTransaction = s.startTransaction();
        const pawn = s.currentState.getCurrentPlayerSelectedPawn<IDeckBearer>()
        try {
          for await (let execution of this.doActivity<IProcedureExecutionStatus<IGatheringDataProcedureStepDeclaration & IMakeActionProcedureStepDeclaration>>(pawn, controller)) {
            if (execution.executionPhaseType === ProcedureExecutionPhase.ExecutionFinished) {
              s.setState(s.currentState);
            }
          }
          //await new Promise(r => setTimeout(r, 1000))
        } catch (e) {
          abandonTransaction()
          throw e;
        }
      }

    }
    return PlayCardCommand;
  }
}