import { EntityService } from "../../base/entity/entity.service";
import { Game } from "../../base/game/game";
import { EventService } from "../../cross-cutting/event/event.service";
import { FinishTurnEvent } from "./aspects/events/finish-turn.event";
import { StartTurnEvent } from "./aspects/events/start-turn.event";
import { ITurnGameplayPlayer } from "./mixins/turn-based-player/turn-based-player.interface";
import { ITurnBasedGameplay, ITurnBasedGameplayDeclaration } from "./turn-based-gameplay.interface";

export class TurnBasedGameplay extends Game implements ITurnBasedGameplay {

  public players: ITurnGameplayPlayer[] = [];

  public get currentPlayer() {
    return this.players
      .find(p => p.id === this.currentPlayerId) as ITurnGameplayPlayer | undefined
  }
  public currentPlayerId: string;
  public order: string[];
  public turn?: number;
  public round?: number;
  
  constructor(
    private readonly _eventService: EventService,
    _entityService: EntityService
  ) {
    super(_entityService)
  }

  public async hydrate(data: ITurnBasedGameplayDeclaration): Promise<void> {
    await super.hydrate(data);
    this.order = data.order;
    this.currentPlayerId = data.currentPlayerId;
    this.turn = data.turn ?? 1;
    this.round = data.round ?? 1;

    if (this.order.length !== this.players.length) {
      throw new Error("Declared order and players mismatched")
    }
  }

  public dehydrate(data: unknown): void {
    Object.assign(data, {
      currentPlayerId: this.currentPlayerId,
      order: this.order,
      turn: this.turn,
      round: this.round
    });
  }

  public startGame(players: ITurnGameplayPlayer[]) {
    super.startGame(players);
    this._eventService.emit(new StartTurnEvent(this.currentPlayer));
  }

  public isAbleToFinishTurn(player: ITurnGameplayPlayer): boolean {
    return true;
  }

  public nextTurn(): { player: ITurnGameplayPlayer } {
    if (this.currentPlayer && this.turn >= 1) {
      this._eventService.emit(new FinishTurnEvent(this.currentPlayer))
    }

    const i = this.order.indexOf(this.currentPlayerId);
    this.currentPlayerId = this.order[i + 1] ?? this.order[0];

    if (!this.order[i + 1]) {
      this.round += 1 
    }
    this.turn += 1;
    this._eventService.emit(new StartTurnEvent(this.currentPlayer));
    return { player: this.currentPlayer };
  }
}