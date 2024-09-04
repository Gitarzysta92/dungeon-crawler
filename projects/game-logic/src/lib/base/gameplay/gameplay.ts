import { IGameplay, IGameplayConfiguration, IGameplayState } from "./gameplay.interface";
import { IPlayer } from "../player/players.interface";
import { IEntity } from "../entity/entity.interface";
import { IPawn } from "../pawn/pawn.interface";
import { EntityService } from "../entity/entity.service";
import { EventService } from "../../cross-cutting/event/event.service";
import { ActionService } from "../../cross-cutting/action/action.service";
import { GameFinishedEvent } from "./game-finished.event";


export abstract class Gameplay implements IGameplay {

  public isGameStarted: boolean;
  public get players() { return this._entityService.getEntities<IPlayer>(e => e.isPlayer) }
  public get entities() { return this._entityService.getAllEntities<IEntity>() };
  public get pawns() { return this._entityService.getEntities<IPawn>(e => e.isPawn) }

  constructor(
    protected readonly _entityService: EntityService,
    protected readonly _actionService: ActionService,
    protected readonly _eventService: EventService
  ) { }

  public async startGame(cfg: IGameplayConfiguration): Promise<void> {
    if (this.isGameStarted) {
      throw new Error("Game already started");
    }
    for (let playerDeclaration of cfg.players) {
      const player = await this._entityService.create<IPlayer>(playerDeclaration);
      this._entityService.registerEntity(player);
      player.selectedPawnId = this.getPawns(player)[0]?.id
    }
    this.isGameStarted = true;
  }

  public getOpponents(ps: IPlayer): IPlayer[] {
    return this.players.filter(p => ps.groupId !== p.groupId);
  }

  public async hydrate(data: IGameplayState): Promise<void> {
    await this._entityService.hydrate(data);
    this.isGameStarted = data.isGameStarted;
  }

  public dehydrate(data: unknown): void {
    Object.assign(data, { players: this.players, entities: this.entities });
  }

  public getSelectedPawn<T>(p: IPlayer): T & IPawn {
    return this._entityService.getEntity<T & IPawn>(pa => pa.id === p?.selectedPawnId)
  }

  public getPawns<T extends IPawn>(p: IPlayer): T[] {
    if (p) {
      return this._entityService.getEntities<T>(e => e.playerId === p.id && e.isPawn);
    } else {
      return this._entityService.getEntities<T>(e => e.isPawn);
    }  
  }

  public finishGame(players: IPlayer[]): Promise<void> {
    return this._eventService.process(new GameFinishedEvent(players))
  }
  
}