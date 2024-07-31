import { IActivity, IActivityDoer } from "../../../../base/activity/activity.interface";
import { IGameplay } from "../../../../base/gameplay/gameplay.interface";
import { IPlayer } from "../../../../base/player/players.interface";
import { NotEnumerable } from "../../../../infrastructure/extensions/object-traverser";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { FINISH_TURN_ACTIVITY, START_TURN_ACTIVITY } from "../../turn-based-gameplay.constants";
import { TurnBasedGameplay } from "../../turn-based.gameplay";
import { ITurnGameplayPlayer, ITurnGameplayPlayerDeclaration, ITurnGameplayPlayerState } from "./turn-based-player.interface";


export class TurnGameplayPlayerMixin implements IMixinFactory<ITurnGameplayPlayer>  {

  constructor() { }

  public isApplicable(e: ITurnGameplayPlayerDeclaration): boolean {
    return e.isTurnGameplayPlayerDeclaration && e.isPlayer;
  };
  
  public create(bc: Constructor<IPlayer>): Constructor<ITurnGameplayPlayer> {
    class TurnGameplayPlayer extends bc implements ITurnGameplayPlayer {
  
      public isTurnGameplayPlayerDeclaration = true as const;
      public startedTurn: boolean;

      @NotEnumerable()
      public gameplay: TurnBasedGameplay

      constructor(d: ITurnGameplayPlayerState) {
        super(d);
        this.startedTurn = d.startedTurn
      }

      public isAnyActivityAvailable(game: IGameplay, activities: IActivity[]): boolean {
        throw new Error("Method not implemented.");
      }

      public isAbleToFinishTurn(): boolean {
        const activity = this.gameplay.activities.find(a => a.id === FINISH_TURN_ACTIVITY);
        return activity.canBeDone(this as IActivityDoer);
      }

      public async finishTurn(): Promise<void> {
        const activity = this.gameplay.activities.find(a => a.id === FINISH_TURN_ACTIVITY);
        if (!activity.canBeDone(this as IActivityDoer)) {
          throw new Error("Cannot finish turn")
        }
        activity.doActivity(this as IActivityDoer, {})
        this.startedTurn = false;
      }

      public isAbleToStartTurn(): boolean {
        const activity = this.gameplay.activities.find(a => a.id === START_TURN_ACTIVITY);
        return activity.canBeDone(this as IActivityDoer);
      }

      public async startTurn(): Promise<void> {
        const activity = this.gameplay.activities.find(a => a.id === START_TURN_ACTIVITY);
        if (!activity.canBeDone(this as IActivityDoer)) {
          throw new Error("Cannot start turn")
        }
        activity.doActivity(this as IActivityDoer, {});
        this.startedTurn = true;
      }
    }
    return TurnGameplayPlayer;
  };
}
