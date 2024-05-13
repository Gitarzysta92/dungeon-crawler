
import { IEntityDeclaration } from "../../../../../lib/base/entity/entity.interface";
import { IPlayer } from "../../../../../lib/base/player/players.interface";
import { IActivitySubject } from "../../../../../lib/base/activity/activity.interface";
import { Guid } from "../../../../../lib/extensions/types";
import { IBoardAssignment } from "../../../../../lib/modules/board/entities/board-object/board-object.interface";



export interface IDungeonArea extends IDungeonAreaDeclaration { 
  enterDungeon(): void;
  leaveDungeon(): void;
}

export interface IDungeonAreaDeclaration extends IEntityDeclaration, IActivitySubject {
  id: Guid;
  isDungeonArea: true;
  predefinedPlayers: IPlayer[];
  playersNumber: number;
  spawnPoints: IBoardAssignment[];
  entities: (IEntityDeclaration & { id?: Guid; sourceActorId?: Guid; groupId?: Guid; } & Partial<IBoardAssignment>)[];
}