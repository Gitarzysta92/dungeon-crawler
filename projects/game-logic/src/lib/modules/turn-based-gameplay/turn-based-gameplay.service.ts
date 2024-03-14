import { IPlayer } from "../../base/player/players.interface";
import { EventService } from "../../cross-cutting/event/event.service";
import { FinishTurnEvent } from "./aspects/events/finish-turn.event";
import { StartTurnEvent } from "./aspects/events/start-turn.event";
import { ITurnBasedGameplayState } from "./turn-based-gameplay.interface";

export class TurnBasedGameplayService {
  state: ITurnBasedGameplayState | undefined;

  constructor(
    private readonly _eventService: EventService
  ) {}
 
  public hydrate(data: ITurnBasedGameplayState) {
    this.state = data;
  }

  public dehydrate(state: Partial<ITurnBasedGameplayState>): void {
    Object.assign(state, this.state);
  }

  public startTurn(): void {
    if (!this.state.currentPlayerId) {
      this.state.currentPlayerId = this.state.order[0];
    }

    const i = this.state.order.indexOf(this.state.currentPlayerId);
    this.state.currentPlayerId = this.state.order[i + 1] ?? this.state.order[0];

    if (!this.state.order[i + 1]) {
      this.state.round += 1 
    }
    this.state.turn += 1;

    const player = this.state.players.find(p => p.id === this.state.currentPlayerId);
    this._eventService.emit(new StartTurnEvent(player))
  }

  public finishTurn(): void {
    const player = this.state.players.find(p => p.id === this.state.currentPlayerId);
    this._eventService.emit(new FinishTurnEvent(player))
  }

  public getCurrentPlayer(): IPlayer {
    return this.state.players.find(p => p.id === this.state.currentPlayerId);
  }
}