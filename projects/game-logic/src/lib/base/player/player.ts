import { IActivity } from "../activity/activity.interface";
import { IGame } from "../game/game.interface";
import { PlayerType } from "./players.constants";
import { IPlayer, IPlayerDeclaration } from "./players.interface";

export class Player implements IPlayer {

  public id: string;
  public playerType: PlayerType;
  public groupId: string;
  public selectedPawnId: string; 

  constructor(data: IPlayerDeclaration) {
    this.id = data.id;
    this.playerType = data.playerType;
    this.groupId = data.groupId;
    this.selectedPawnId = data.selectedPawnId;
  }

  public isAnyActivityAvailable(state: IGame, activities: IActivity[]): boolean {
    const pawns = state.getPawns(this);
    return pawns.some(p => activities.some(a => p.canPerform(a)));
  }

  
}