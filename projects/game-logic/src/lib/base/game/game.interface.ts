import { IEntity, IEntityDeclaration } from "../entity/entity.interface";
import { IPawn } from "../pawn/pawn.interface";
import { IPlayer, IPlayerDeclaration } from "../player/players.interface";

export interface IGame extends IGameDeclaration {
  entities: IEntity[];
  hydrate(data: IGameDeclaration): Promise<void>
  dehydrate(data: unknown): void
  getSelectedPawn(p: IPlayer): IPawn;
  getPawns(p: IPlayer): IPawn[];
}

export interface IGameDeclaration {
  entities: IEntityDeclaration[];
  players?: IPlayerDeclaration[]
}