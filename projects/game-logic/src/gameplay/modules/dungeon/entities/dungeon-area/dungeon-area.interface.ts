
import { IEntity } from "../../../../../lib/base/entity/entity.interface";
import { IPlayer } from "../../../../../lib/base/player/players.interface";
import { Guid } from "../../../../../lib/extensions/types";
import { IBoardAssignment } from "../../../../../lib/modules/board/entities/board-object/board-object.interface";



export interface IDungeonTemplate extends IDungeonTemplateDeclaration { }

export interface IDungeonTemplateDeclaration extends IEntity {
  id: Guid;
  isDungeonArea: true;
  predefinedPlayers: IPlayer[];
  playersNumber: number;
  spawnPoints: IBoardAssignment[];
  entities: ({ id?: Guid; sourceActorId?: Guid; groupId?: Guid; } & Partial<IBoardAssignment>)[];
}