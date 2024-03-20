import { Entity } from "../../../../../lib/base/entity/entity";
import { IEntity, IEntityFactory } from "../../../../../lib/base/entity/entity.interface";
import { EntityService } from "../../../../../lib/base/entity/entity.service";
import { IPlayer } from "../../../../../lib/base/player/players.interface";
import { Constructor } from "../../../../../lib/extensions/types";
import { AreaService } from "../../../../../lib/modules/areas/areas.service";
import { IBoardAssignment } from "../../../../../lib/modules/board/entities/board-object/board-object.interface";
import { IControllable } from "../../../../../lib/modules/turn-based-gameplay/turn-based-gameplay.interface";
import { IDungeonDataFeed } from "../../dungeon.interface";
import { IDungeonGameplayStateDto } from "../../../../state/dungeon/dungeon-gameplay.interface";
import { IDungeonArea, IDungeonAreaDeclaration } from "./dungeon-area.interface";
import { IActorDataFeed } from "../../../../../lib/modules/actors/actors.interface";

export class DungeonAreaFactory implements IEntityFactory<IDungeonArea> {

  constructor(
    private readonly _areaService: AreaService,
    private readonly _entityService: EntityService,
    private readonly _dataFeed: IDungeonDataFeed & IActorDataFeed
  ) { }
    
  public validate(e: IEntity & Partial<IDungeonArea>): boolean {
    return e.isDungeonArea;
  };

  public create(e: typeof Entity): Constructor<IDungeonArea> {
    const areaService = this._areaService;
    const entityService = this._entityService;
    const dataFeed = this._dataFeed;
    class DungeonArea extends e implements IDungeonArea {

      isDungeonArea = true as const;
      predefinedPlayers: IPlayer[];
      playersNumber: number;
      spawnPoints: IBoardAssignment[];
      entities: ({ id?: string; sourceActorId?: string; groupId?: string; } & Partial<IBoardAssignment>)[];

      private readonly _areaService: AreaService = areaService;
      private readonly _entityService: EntityService = entityService;
      private readonly _dataFeed: IDungeonDataFeed & IActorDataFeed = dataFeed; 

      constructor(d: IDungeonAreaDeclaration) { 
        super(d);
        this.isDungeonArea = d.isDungeonArea;
        this.playersNumber = d.playersNumber;
        this.spawnPoints = d.spawnPoints;
        this.entities = d.entities;
      }

      public async enterDungeon(heroes: Array<IEntity & IControllable>, players: IPlayer[]): Promise<IDungeonGameplayStateDto> {        
        players = players.concat(this.predefinedPlayers);
        const entities = await Promise.all(this.entities.map(async e => Object.assign(await this._dataFeed.getActor(e.sourceActorId ?? e.id), e)))
        return {
          id: this.id,
          players: players,
          order: players.map(p => p.id),
          playersNumber: this.playersNumber,
          currentPlayerId: players[0].id,
          turn: 1,
          round: 1,
          entities: this._initializeHeroes(heroes, players).concat(entities)
        };
      }

      private _initializeHeroes(heroes: Array<IEntity & IControllable>, players: IPlayer[]): IEntity[] {
        heroes = heroes.filter(h => players.some(p => p.groupId === h.groupId));
        if (this.spawnPoints.length < heroes.length) {
          throw new Error("To many heroes selected for given dungeon'");
        }
        heroes.forEach((h, i) => Object.assign(h, this.spawnPoints[i]))
        return heroes 
      }
      
    }
    return DungeonArea
  }
}