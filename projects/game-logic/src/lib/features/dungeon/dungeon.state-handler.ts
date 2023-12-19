import { Guid } from "../../extensions/types";
import { IDungeonPlayer, IDungeonState } from "./dungeon.interface";

export class DungeonStateHandler implements IDungeonState {
  dungeonId: Guid;
  players: IDungeonPlayer[];
  currentPlayerId: string;
  playersNumber: boolean;
  turn: number;
  round: number;
  isDungeonTurn: boolean;
  isDungeonFinished: boolean;

  constructor(data: IDungeonState) {

  }
 
  public isPlayerNotStartedTurn(): boolean {
    if (!this.changesHistory[0]) {
      return true;
    }
    return this.changesHistory[0]?.name === SystemActivityName.FinishDungeonTurn && this.isDungeonTurn === false;
  }


  public isPlayerTurn(): boolean {
    return !this.isDungeonTurn;
  }

  public updateRoundCount(): void {
    this.round = Math.round(this.turn / this.playersNumber)
  }

  public tryFinishDungeon(): void {
    if (this.hero.isDefeated()) {
      this.isDungeonFinished = true;
    }
  }

  public applyTurnToChangeHistory(): void {
    if (this.changesHistory[0]) {
      this.changesHistory[0].turn = this.turn
    }
  }

  public setPerformerForLastActivity(): void {
    const lastActivity = this.changesHistory[0];
    if (!lastActivity) {
      return;
    }
    lastActivity.playerId = Object.keys(SystemActivityName)
      .includes(lastActivity.name) ? this.deck.id : this.hero.id;
  }
}