
import { IActivitySubject } from "../../../../../lib/base/activity/activity.interface";
import { IEntityDeclaration, IEntity } from "../../../../../lib/base/entity/entity.interface";
import { IPlayer, IPlayerDeclaration } from "../../../../../lib/base/player/players.interface";
import { Constructor } from "../../../../../lib/infrastructure/extensions/types";
import { IMixinFactory } from "../../../../../lib/infrastructure/mixin/mixin.interface";
import { IBoardAssignment } from "../../../../../lib/modules/board/entities/board-object/board-object.interface";
import { IBoardArea } from "../../../board-areas/entities/board-area/board-area.interface";

import { IDungeonArea, IDungeonAreaDeclaration } from "./dungeon-area.interface";

export class DungeonAreaFactory implements IMixinFactory<IDungeonArea> {

  constructor() { }
    
  public validate(e: IEntityDeclaration & Partial<IDungeonArea>): boolean {
    return e.isDungeonArea;
  };

  public create(e: Constructor<IEntity & IBoardArea & IActivitySubject>): Constructor<IDungeonArea> {
    class DungeonArea extends e implements IDungeonArea {

      public dungeonId: string;
      public isDungeonArea = true as const;
      public isActivitySubject = true as const;
      public predefinedPlayers: IPlayerDeclaration[];
      public playersNumber: number;
      public spawnPoints: IBoardAssignment[];

      constructor(d: IDungeonAreaDeclaration) {
        super(d);
        this.playersNumber = d.playersNumber;
        this.spawnPoints = d.spawnPoints;
        this.dungeonId = d.dungeonId;
        this.predefinedPlayers = d.predefinedPlayers;
      }

    }
    return DungeonArea
  }
}