import { IActivity } from "../../../lib/base/activity/activity.interface";
import { EntityService } from "../../../lib/base/entity/entity.service";
import { IPawn } from "../../../lib/base/pawn/pawn.interface";
import { EventService } from "../../../lib/cross-cutting/event/event.service";
import { IDefeatable } from "../../../lib/modules/actors/entities/defeatable/defeatable.interface";
import { BoardService } from "../../../lib/modules/board/board.service";
import { IDeckBearer } from "../../../lib/modules/cards/entities/deck-bearer/deck-bearer.interface";
import { ITurnGameplayPlayer } from "../../../lib/modules/turn-based-gameplay/mixins/turn-based-player/turn-based-player.interface";
import { TurnBasedGameplay } from "../../../lib/modules/turn-based-gameplay/turn-based.gameplay";
import { IDungeonGameplayDeclaration, IDungeonGameplayTurnResult } from "./dungeon.interface";

export class DungeonGameplay extends TurnBasedGameplay {
  public id: string;
  public get board() { return this._boardService };

  constructor(
    _eventService: EventService,
    _entityService: EntityService,
    private readonly _boardService: BoardService
  ) {
    super(_eventService, _entityService)
  }

  public async hydrate(data: IDungeonGameplayDeclaration): Promise<void> {
    super.hydrate(data);
    this.id = data.id;
  }

  public startGame(players: ITurnGameplayPlayer[]) {
    super.startGame(players)
  }

  public nextTurn(): IDungeonGameplayTurnResult {
    const winners = this.getWinners();
    if (winners.length > 0) {
      return { player: null, winners: winners, isFinished: true }
    }
    return Object.assign({ winners: [], isFinished: false }, super.nextTurn())
  }

  public getWinners(): ITurnGameplayPlayer[] {
    const defeated = [];
    const winners: {player: ITurnGameplayPlayer, opponents: ITurnGameplayPlayer[]}[] = [];
    for (let player of this.players) {
      const pawns = this.getPawns<IPawn & IDefeatable>(player);
      if (pawns.every(p => p.isDefeated) && pawns.length > 0) {
        defeated.push(player);
      } else {
        const opponents = this.players.filter(p => p.groupId !== player.groupId);
        winners.push({ player, opponents });
      }
    }
    return winners.filter(w => w.opponents.every(o => defeated.includes(o))).map(w => w.player);
  }

  public getCurrentPlayerSelectedPawn<T extends IPawn>(): T {
    return super.getSelectedPawn<T>(this.currentPlayer);
  }


  public getAvailableActivities(): IActivity[] {
    const pawn = this.getCurrentPlayerSelectedPawn<IPawn & IDeckBearer>();
    //pawn.hand.cards.map(c => pawn.deck.cards.find(dc => dc.id === c.id))
    return [] 
  }

}