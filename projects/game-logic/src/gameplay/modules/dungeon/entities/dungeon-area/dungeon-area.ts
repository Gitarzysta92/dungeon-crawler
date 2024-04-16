import { IActivity } from "../../../../../lib/base/activity/activity.interface";
import { IEntity, IEntityDeclaration } from "../../../../../lib/base/entity/entity.interface";
import { IMixinFactory } from "../../../../../lib/base/mixin/mixin.interface";
import { IPlayer } from "../../../../../lib/base/player/players.interface";
import { Constructor } from "../../../../../lib/extensions/types";
import { IBoardAssignment } from "../../../../../lib/modules/board/entities/board-object/board-object.interface";
import { DungeonService } from "../../dungeon.service";
import { IDungeonArea, IDungeonAreaDeclaration } from "./dungeon-area.interface";

export class DungeonAreaFactory implements IMixinFactory<IDungeonArea> {

  constructor(
    private readonly _dungeonService: DungeonService
  ) { }
    
  public validate(e: IEntityDeclaration & Partial<IDungeonArea>): boolean {
    return e.isDungeonArea;
  };

  public create(e: Constructor<IEntity>): Constructor<IDungeonArea> {
    const dungeonService = this._dungeonService;
    class DungeonArea extends e implements IDungeonArea {

      isDungeonArea = true as const;
      isActivitySubject = true as const;
      predefinedPlayers: IPlayer[];
      playersNumber: number;
      spawnPoints: IBoardAssignment[];
      activities: IActivity[];
      entities: (IEntityDeclaration & { sourceActorId?: string; groupId?: string; } & Partial<IBoardAssignment>)[];

      constructor(d: IDungeonAreaDeclaration) { 
        super(d);
        this.isDungeonArea = d.isDungeonArea;
        this.playersNumber = d.playersNumber;
        this.spawnPoints = d.spawnPoints;
        this.activities = d.activities;
        this.entities = d.entities;
      }

      public enterDungeon(): void {
        throw new Error("Method not implemented.");
      }

      public leaveDungeon(): void {
        throw new Error("Method not implemented.");
      }

    }
    return DungeonArea
  }
}