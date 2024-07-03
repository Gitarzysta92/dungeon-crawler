import { IActivitySubjectDeclaration } from "../../../../../lib/base/activity/activity.interface";
import { IEntity, IEntityDeclaration } from "../../../../../lib/base/entity/entity.interface";
import { IEventListenerDeclaration } from "../../../../../lib/cross-cutting/event/event.interface";
import { Guid } from "../../../../../lib/infrastructure/extensions/types";
import { INestedArea, INestedAreaDeclaration } from "../../../../../lib/modules/areas/entities/area/area.interface";
import { IBoardField, IBoardFieldDeclaration } from "../../../../../lib/modules/board/entities/board-field/board-field.interface";
import { IBoardAreaResident } from "../board-resident/resident.interface";
import { IBoardTraveler } from "../board-traveler/board-traveler.interface";


export interface IBoardArea extends IBoardAreaDeclaration, IBoardField, IEntity {
  nestedAreas?: INestedArea[];
  traveler: IBoardTraveler;
  residents: IBoardAreaResident[];
  isTravelable: boolean;
  hasConnection(area: IBoardArea): boolean;
  traverseNestedAreas<T extends INestedArea>(cb: (area: T) => void)
}

export interface IBoardAreaDeclaration extends IEntityDeclaration, IActivitySubjectDeclaration, IBoardFieldDeclaration {
  id: Guid;
  nestedAreas?: INestedAreaDeclaration[];
  terrainDifficulty: number;
  isBoardArea: true;
  unlockWhen: IEventListenerDeclaration<unknown>[];
  isUnlocked: boolean;
}