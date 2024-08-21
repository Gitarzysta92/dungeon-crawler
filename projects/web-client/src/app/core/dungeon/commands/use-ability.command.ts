import { DungeonStateStore } from "../stores/dungeon-state.store";
import { IMixinFactory } from "@game-logic/lib/infrastructure/mixin/mixin.interface";
import { Constructor } from "@game-logic/lib/infrastructure/extensions/types";
import { ICommand } from "../../game/interfaces/command.interface";
import { IGatheringController, IGatheringDataStepDeclaration } from "@game-logic/lib/cross-cutting/gatherer/data-gatherer.interface";
import { IActivitySubject } from "@game-logic/lib/base/activity/activity.interface";
import { IInteractableMedium } from "../../game-ui/mixins/interactable-medium/interactable-medium.interface";
import { IUseAbilityActivity } from "@game-logic/lib/modules/abilities/activities/use-ability.activity";
import { USE_ABILITY_ACTIVITY } from "@game-logic/lib/modules/abilities/abilities.constants";
import { IAbilityPerformer } from "@game-logic/lib/modules/abilities/entities/performer/ability-performer.interface";
import { MODIFY_POSITION_BY_PATH_ACTION } from "@game-logic/lib/modules/board/aspects/actions/modify-position-by-path.action";
import { ProcedureExecutionPhase } from "@game-logic/lib/base/procedure/procedure.constants";
import { ISceneMedium } from "../../scene/mixins/scene-medium/scene-medium.interface";
import { IAggregatedData, IProcedureExecutionStatus } from "@game-logic/lib/base/procedure/procedure.interface";
import { IMakeActionStepDeclaration } from "@game-logic/lib/cross-cutting/action/action.interface";
import { IAbility } from "@game-logic/lib/modules/abilities/entities/ability/ability.interface";


export class UseAbilityCommand implements IMixinFactory<any> {

  constructor(

  ) {}
  
  isApplicable(a: IUseAbilityActivity): boolean {
    return a.isActivity && a.id === USE_ABILITY_ACTIVITY;
  }

  create(e: Constructor<IUseAbilityActivity>): Constructor<ICommand> {

    class UseAbilityCommand extends e implements ICommand {

      public isCommand = true as const; 
      public subject: IActivitySubject & IInteractableMedium & IAbility;;

      public finalizationCallback: Map<Function, Function> = new Map();
      
      constructor(d: unknown) {
        super(d);
      }

      public async indicate(s: DungeonStateStore): Promise<void> {}

      public async execute(
        s: DungeonStateStore,
        controller: IGatheringController
      ): Promise<void> {
        this.finalizationCallback.clear();
        const abandonTransaction = s.startTransaction();
        const pawn = s.currentState.getCurrentPlayerSelectedPawn<IAbilityPerformer>()
        try {
          for await (let execution of this.doActivity(pawn, controller)) {
            s.setState(s.currentState);
            await this._handleExecution(execution as IProcedureExecutionStatus<IGatheringDataStepDeclaration & IMakeActionStepDeclaration>);
          }
        } catch (e) {
          abandonTransaction()
          throw e;
        }
      }

      public onFinalization() {
        this._handleFinalizationCallbacks()
      }

      private async _handleExecution(execution: IProcedureExecutionStatus<IGatheringDataStepDeclaration & IMakeActionStepDeclaration>) {
        if (execution.step?.isMakeActionStep || execution.executionPhaseType === ProcedureExecutionPhase.ExecutionFinished) { 
          this._handleFinalizationCallbacks()
        }
        

        if ((execution.step as any)?.delegateId === MODIFY_POSITION_BY_PATH_ACTION && execution.executionData && 'value' in execution.executionData) {
          await execution.executionData.value.target.updateSceneRotation();
          await (execution.executionData.value.target as ISceneMedium).updateScenePosition();
        }

        this._aggregateFinalizeCallbacks(execution.aggregatedData);
      }


      private _handleFinalizationCallbacks() {
        for (let f of this.finalizationCallback.values()) {
          f()
        }
        this.finalizationCallback.clear()
      }

      private _aggregateFinalizeCallbacks(aggregatedData: IAggregatedData[]) {
        for (let pass of aggregatedData) {
          for (let step of Object.values(pass)) {
            const finalize = (step as any).userData?.finalize
            if (finalize) {
              this.finalizationCallback.set(finalize, finalize)
            }
          } 
        }
      }

    }
    return UseAbilityCommand;
  }
}