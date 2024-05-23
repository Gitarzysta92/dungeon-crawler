import { IActivity } from "../activity/activity.interface";
import { IPawn } from "../pawn/pawn.interface";
import { IPlayer } from "../player/players.interface";

export interface IGame {
  getSelectedPawn(): IPawn;
  getPawns(p: IPlayer): IPawn[];
  getAvailableActivities(hero: any): Array<IActivity>;
}