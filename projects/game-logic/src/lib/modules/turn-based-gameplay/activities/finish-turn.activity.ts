import { IActivity, IActivityCost, IActivitySubject } from "../../../base/activity/activity.interface";
import { NotEnumerable } from "../../../infrastructure/extensions/object-traverser";
import { Constructor } from "../../../infrastructure/extensions/types";
import { IMixinFactory, IMixin } from "../../../infrastructure/mixin/mixin.interface";
import { FinishTurnActionHandler } from "../aspects/actions/finish-turn.action";
import { ITurnGameplayPlayer } from "../mixins/turn-based-player/turn-based-player.interface";
import { FINISH_TURN_ACTIVITY } from "../turn-based-gameplay.constants";
import { TurnBasedGameplay } from "../turn-based.gameplay";

export interface IFinishTurnActivity extends IActivity {
  id: typeof FINISH_TURN_ACTIVITY,
  doActivity(): Promise<void>
}


export class FinishTurnActivityFactory implements IMixinFactory<IActivity> {

  constructor(
    private readonly _finishTurnAction: FinishTurnActionHandler
  ) { }

  public isApplicable(a: IActivity): boolean {
    return a.isActivity && a.id === FINISH_TURN_ACTIVITY;
  }

  public create(c: Constructor<IMixin>): Constructor<IActivity> {
    const finishTurnAction = this._finishTurnAction;
    class FinishTurnActivity extends c implements IActivity {

      id = FINISH_TURN_ACTIVITY
      cost?: IActivityCost[];
      isActivity = true as const;

      @NotEnumerable()
      subject: TurnBasedGameplay & IActivitySubject;


      canBeDone(doer: ITurnGameplayPlayer): boolean {
        return this.subject.currentPlayerId === doer.id && doer.startedTurn;
      }


      doActivity(): Promise<void> {
        return finishTurnAction.process({gameplay: this.subject})
      }

     
    }

    return FinishTurnActivity;
  }

}