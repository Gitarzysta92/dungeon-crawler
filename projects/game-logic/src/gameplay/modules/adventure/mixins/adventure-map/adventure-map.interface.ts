
import { IEntityDeclaration } from "../../../../../lib/base/entity/entity.interface";
import { IMixin } from "../../../../../lib/base/mixin/mixin.interface";
import { Guid } from "../../../../../lib/extensions/types";
import { IBoardAssignment } from "../../../../../lib/modules/board/entities/board-object/board-object.interface";


export interface IAdventureMap extends IAdventureMapDeclaration { }

export interface IAdventureMapDeclaration extends IMixin {
  id: Guid;
  isAdventureMap: true;
  //spawnPoints: IBoardAssignment[];
  entities: (IEntityDeclaration & { id?: Guid; sourceActorId?: Guid; groupId?: Guid; } & Partial<IBoardAssignment>)[];
}