import { IActivity } from "../activity/activity.interface";
import { IEntity, IEntityDeclaration } from "../entity/entity.interface";
import { IPawn } from "../pawn/pawn.interface";
import { IPlayer } from "../player/players.interface";

export interface IGame extends IGameDeclaration {
  entities: IEntity[];
  getSelectedPawn(): IPawn;
  getPawns(p: IPlayer): IPawn[];
  getAvailableActivities(hero: any): Array<IActivity>;
}

export interface IGameDeclaration {
  entities: IEntityDeclaration[]
}