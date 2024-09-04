import { DungeonStateStore } from "../stores/dungeon-state.store";
import { IMixinFactory } from "@game-logic/lib/infrastructure/mixin/mixin.interface";
import { Constructor } from "@game-logic/lib/infrastructure/extensions/types";
import { ICommand } from "../../game/interfaces/command.interface";
import { PLAY_CARD_ACTIVITY } from "@game-logic/lib/modules/cards/cards.constants";
import { IGatheringController, IGatheringDataStepDeclaration } from "@game-logic/lib/cross-cutting/gatherer/data-gatherer.interface";
import { IPlayCardActivity } from "@game-logic/lib/modules/cards/activities/play-card.activity";
import { IDeckBearer } from "@game-logic/lib/modules/cards/entities/deck-bearer/deck-bearer.interface";
import { IActivitySubject } from "@game-logic/lib/base/activity/activity.interface";
import { IInteractableMedium } from "../../game-ui/mixins/interactable-medium/interactable-medium.interface";
import { IProcedureExecutionStatus } from "@game-logic/lib/base/procedure/procedure.interface";
import { ProcedureExecutionPhase } from "@game-logic/lib/base/procedure/procedure.constants";
import { IMakeActionStepDeclaration } from "@game-logic/lib/cross-cutting/action/action.interface";
import { ICardOnPile } from "@game-logic/lib/modules/cards/entities/card-on-pile/card-on-pile.interface";
import { DEAL_DAMAGE_ACTION, IDealDamageActionPayload } from "@game-logic/lib/modules/combat/aspects/actions/deal-damage.action";
import { SceneService } from "../../scene/services/scene.service";
import { SceneMediumFactory } from "../../scene/mixins/scene-medium/scene-medium.factory";
import { MODIFY_POSITION_BY_PATH_ACTION } from "@game-logic/lib/modules/board/aspects/actions/modify-position-by-path.action";
import { ISceneMedium } from "../../scene/mixins/scene-medium/scene-medium.interface";

export interface IPlayCardCommand extends ICommand {
  playCardCommandProcedureCache: Map<IInteractableMedium, IInteractableMedium>;
}



export class PlayCardCommand implements IMixinFactory<IPlayCardCommand> {

  constructor(
    private readonly _sceneService: SceneService
  ) {}
  
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
    const sceneService = this._sceneService;
    class PlayCardCommand extends e implements IPlayCardCommand {

      public isCommand = true as const; 
      public subject: IActivitySubject & IInteractableMedium & ICardOnPile;
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
          for await (let execution of this.doActivity<IProcedureExecutionStatus<IGatheringDataStepDeclaration & IMakeActionStepDeclaration>>(pawn, controller)) {
            await this._tryPlayAnimation(execution)
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

      private async _tryPlayAnimation(es: IProcedureExecutionStatus<IGatheringDataStepDeclaration & IMakeActionStepDeclaration<unknown>, unknown>): Promise<void> {
        if (es.step?.delegateId === DEAL_DAMAGE_ACTION && es.executionPhaseType === ProcedureExecutionPhase.Executing) {
          const { dealer, receiver } = es.executionData as IDealDamageActionPayload
          if (SceneMediumFactory.isSceneMedium(dealer) && SceneMediumFactory.isSceneMedium(receiver)) {
            await sceneService.components.animationPlayerComponent.playAnimation(
              SceneMediumFactory.asSceneMedium(dealer).scenePosition,
              SceneMediumFactory.asSceneMedium(receiver).scenePosition
            )
          }
        }

        if ((es.step as any)?.delegateId === MODIFY_POSITION_BY_PATH_ACTION && es.executionData && 'value' in (es.executionData as any)) {
          await (es.executionData as any).value.target.updateSceneRotation();
          await ((es.executionData as any).value.target as ISceneMedium).updateScenePosition();
          
        }
      }

    }
    return PlayCardCommand;
  }
}