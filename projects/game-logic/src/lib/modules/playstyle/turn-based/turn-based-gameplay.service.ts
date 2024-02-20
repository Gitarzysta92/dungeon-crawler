import { IPlayer } from "../../../base/player/players.interface";
import { ITurnBasedGameplayState } from "./turn-based-gameplay.interface";

export class TurnBasedGameplayService {
  state: ITurnBasedGameplayState | undefined;

  constructor() {}
 
  hydrate(data: ITurnBasedGameplayState) {
    this.state = data;
  }

  dehydrate(state: Partial<ITurnBasedGameplayState>): void {
    Object.assign(state, this.state);
  }

  public finishTurn(): void {
    throw new Error("Method not implemented.");
  }

  public isPlayerNotStartedTurn(): boolean {
    return false;
  }


  public isPlayerTurn(): boolean {
    return true;
  }

  public updateRoundCount(): void {
    
  }

  public getCurrentPlayer(): IPlayer {
    throw new Error("Method not implemented.");
  }
}