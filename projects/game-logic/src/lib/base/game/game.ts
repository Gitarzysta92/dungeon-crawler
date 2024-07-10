import { IGame, IGameDeclaration } from "./game.interface";
import { IPlayer } from "../player/players.interface";
import { IEntity } from "../entity/entity.interface";
import { IPawn } from "../pawn/pawn.interface";
import { EntityService } from "../entity/entity.service";


export abstract class Game implements IGame {

  public players: IPlayer[];
  public get entities() { return this._entityService.getAllEntities<IEntity>() };

  constructor(
    private readonly _entityService: EntityService
  ) { }

  public startGame(players: IPlayer[]) {
    this.players = players;
  }

  public getOpponents(ps: IPlayer): IPlayer[] {
    return this.players.filter(p => ps.groupId !== p.groupId);
  }

  public async hydrate(data: IGameDeclaration): Promise<void> {
    this.players = data.players as IPlayer[];
    await this._entityService.hydrate(data);
    for (let p of this.players) {
      p.selectedPawnId = this.getPawns(p)[0]?.id
    }
  }

  public dehydrate(data: unknown): void {
    Object.assign(data, { players: this.players, entities: this.entities });
  }

  public getSelectedPawn<T extends IPawn>(p: IPlayer): T {
    return this._entityService.getEntity<T>(pa => pa.id === p.selectedPawnId)
  }

  public getPawns<T extends IPawn>(p: IPlayer): T[] {
    if (p) {
      return this._entityService.getEntities<T>(e => e.playerId === p.id && e.isPawn);
    } else {
      return this._entityService.getEntities<T>(e => e.isPawn);
    }  
  }
  
}