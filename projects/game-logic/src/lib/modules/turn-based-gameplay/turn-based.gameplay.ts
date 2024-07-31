import { IActivity, IActivitySubject } from "../../base/activity/activity.interface";
import { EntityService } from "../../base/entity/entity.service";
import { Gameplay } from "../../base/gameplay/gameplay";
import { ActionService } from "../../cross-cutting/action/action.service";
import { EventService } from "../../cross-cutting/event/event.service";
import { MixinService } from "../../infrastructure/mixin/mixin.service";
import { StartTurnEvent } from "./aspects/events/start-turn.event";
import { ITurnGameplayPlayer } from "./mixins/turn-based-player/turn-based-player.interface";
import { START_TURN_ACTIVITY, FINISH_TURN_ACTIVITY } from "./turn-based-gameplay.constants";
import { ITurnBasedGameplay, ITurnBasedGameplayConfiguration, ITurnBasedGameplayState } from "./turn-based-gameplay.interface";

export class TurnBasedGameplay extends Gameplay implements ITurnBasedGameplay, IActivitySubject {

  public get players() { return this._entityService.getEntities<ITurnGameplayPlayer>(e => e.isPlayer) }

  public get currentPlayer() {
    return this.players
      .find(p => p.id === this.currentPlayerId) as ITurnGameplayPlayer | undefined
  }
  public currentPlayerId: string;
  public order: string[];
  public turn: number;
  public round: number;

  public activities: IActivity[] = [];
  public isActivitySubject = true as const;
  public isMixin: true;

  
  constructor(
    protected readonly _eventService: EventService,
    protected readonly _entityService: EntityService,
    protected readonly _mixinService: MixinService,
    protected readonly _actionService: ActionService
  ) {
    super(_entityService, _actionService, _eventService)
  }

  public async startGame(cfg: ITurnBasedGameplayConfiguration): Promise<void> {
    await super.startGame(cfg);
    this.order = cfg.order;
    this.currentPlayerId = this.order[0];
    for (let player of this.players) {
      Object.defineProperty(player, 'gameplay', { value: this, enumerable: false });
    }
    this.currentPlayer.startTurn();
  }
  
  public async hydrate(data: ITurnBasedGameplayState): Promise<void> {
    await super.hydrate(data);
    this.order = data.order;
    this.currentPlayerId = data.currentPlayerId;
    this.turn = data.turn ?? 1;
    this.round = data.round ?? 1;

    this.registerActivities();
    for (let player of this.players) {
      Object.defineProperty(player, 'gameplay', { value: this, enumerable: false });
    }
    if (this.order.length !== this.players.length) {
      throw new Error("Declared order and players mismatched")
    }
  }

  public getCurrentPlayerSelectedPawn<T>(): T {
    return super.getSelectedPawn<T>(this.currentPlayer);
  }

  public registerActivities() {
    let activity = this._mixinService.create({ id: START_TURN_ACTIVITY, cost: [], isActivity: true, isMixin: true }) as IActivity;
    Object.defineProperty(activity, 'subject', { enumerable: false, configurable: false, value: this });
    this.activities.push(activity);

    activity = this._mixinService.create({ id: FINISH_TURN_ACTIVITY, cost: [], isActivity: true, isMixin: true }) as IActivity;
    Object.defineProperty(activity, 'subject', { enumerable: false, configurable: false, value: this });
    this.activities.push(activity);
  }

}