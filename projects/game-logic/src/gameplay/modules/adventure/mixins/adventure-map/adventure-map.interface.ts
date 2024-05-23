
import { IEntityDeclaration } from "../../../../../lib/base/entity/entity.interface";
import { Guid } from "../../../../../lib/infrastructure/extensions/types";
import { IMixin } from "../../../../../lib/infrastructure/mixin/mixin.interface";
import { IBoardAssignment } from "../../../../../lib/modules/board/entities/board-object/board-object.interface";


export interface IAdventureMap extends IAdventureMapDeclaration { }

export interface IAdventureMapDeclaration extends IMixin {
  id: Guid;
  isAdventureMap: true;
  //spawnPoints: IBoardAssignment[];
  entities: (IEntityDeclaration & { id?: Guid; sourceActorId?: Guid; groupId?: Guid; } & Partial<IBoardAssignment>)[];
}