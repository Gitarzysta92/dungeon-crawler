import { IEntity, IEntityDeclaration } from "../entity/entity.interface";
import { IPawn } from "../pawn/pawn.interface";
import { IPlayer, IPlayerDeclaration } from "../player/players.interface";

export interface IGameplay extends IGameplayState {
  entities: IEntity[];
  players: IPlayer[];
  pawns: IPawn[];
  hydrate(data: IGameplayState): Promise<void>
  dehydrate(data: unknown): void
  getSelectedPawn(p: IPlayer): IPawn;
  getPawns(p: IPlayer): IPawn[];
  finishGame(players: IPlayer[]): void
}

export interface IGameplayState {
  entities: IEntityDeclaration[];
  isGameStarted: boolean;
}

export interface IGameplayDeclaration {
  entities: IEntityDeclaration[];
}

export interface IGameplayConfiguration {
  players: IPlayerDeclaration[];
}