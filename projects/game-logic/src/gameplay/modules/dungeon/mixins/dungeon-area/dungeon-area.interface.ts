import { IActivitySubject, IActivitySubjectDeclaration } from "../../../../../lib/base/activity/activity.interface";
import { IEntity, IEntityDeclaration } from "../../../../../lib/base/entity/entity.interface";
import { IPlayer } from "../../../../../lib/base/player/players.interface";
import { Guid } from "../../../../../lib/infrastructure/extensions/types";
import { IBoardAssignment } from "../../../../../lib/modules/board/entities/board-object/board-object.interface";
import { IBoardArea } from "../../../board-areas/entities/board-area/board-area.interface";

export interface IDungeonArea extends Omit<IDungeonAreaDeclaration, 'activities'>, IActivitySubject, IEntity, Omit<IBoardArea, 'activities'> { 
}

export interface IDungeonAreaDeclaration extends IEntityDeclaration, IActivitySubjectDeclaration {
  id: Guid;
  dungeonId: Guid;
  isDungeonArea: true;
  predefinedPlayers: IPlayer[];
  playersNumber: number;
  spawnPoints: IBoardAssignment[];
}