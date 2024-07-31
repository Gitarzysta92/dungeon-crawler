
import { IActivity, IActivityCost, IActivitySubject } from "../../../base/activity/activity.interface";
import { NotEnumerable } from "../../../infrastructure/extensions/object-traverser";
import { Constructor } from "../../../infrastructure/extensions/types";
import { IMixinFactory, IMixin } from "../../../infrastructure/mixin/mixin.interface";
import { StartTurnActionHandler } from "../aspects/actions/start-turn.action";
import { ITurnGameplayPlayer } from "../mixins/turn-based-player/turn-based-player.interface";
import { START_TURN_ACTIVITY } from "../turn-based-gameplay.constants";
import { TurnBasedGameplay } from "../turn-based.gameplay";

export interface IStartTurnActivity extends IActivity {
  id: typeof START_TURN_ACTIVITY,
  doActivity(): Promise<void>
}


export class StartTurnActivityFactory implements IMixinFactory<IActivity> {

  constructor(
    private readonly _startTurnAction: StartTurnActionHandler
  ) { }

  public isApplicable(a: IActivity): boolean {
    return a.isActivity && a.id === START_TURN_ACTIVITY;
  }

  public create(c: Constructor<IMixin>): Constructor<IActivity> {
    const startTurnAction = this._startTurnAction;
    class StartTurnActivity extends c implements IActivity {

      id = START_TURN_ACTIVITY
      cost?: IActivityCost[];
      isActivity = true as const;

      @NotEnumerable()
      subject: TurnBasedGameplay & IActivitySubject;


      canBeDone(doer: ITurnGameplayPlayer): boolean {
        return this.subject.currentPlayerId === doer.id;
      }


      doActivity(): Promise<void> {
        return startTurnAction.process({gameplay: this.subject})
      }

     
    }

    return StartTurnActivity;
  }

}