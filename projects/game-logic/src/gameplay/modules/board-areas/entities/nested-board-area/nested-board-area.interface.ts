import { IActivitySubjectDeclaration } from "../../../../../lib/base/activity/activity.interface";
import { IEntity, IEntityDeclaration } from "../../../../../lib/base/entity/entity.interface";
import { IEventListenerDeclaration } from "../../../../../lib/cross-cutting/event/event.interface";
import { Guid } from "../../../../../lib/infrastructure/extensions/types";
import { INestedArea, INestedAreaDeclaration } from "../../../../../lib/modules/areas/entities/area/area.interface";
import { ICubeCoordinates } from "../../../../../lib/modules/board/board.interface";
import { IBoardField } from "../../../../../lib/modules/board/entities/board-field/board-field.interface";
import { IBoardAreaResident } from "../board-resident/resident.interface";
import { IBoardTraveler } from "../board-traveler/board-traveler.interface";


export interface INestedBoardArea extends INestedBoardAreaDeclaration, IBoardField, IEntity {
  nestedAreas?: INestedArea[];
  traveler: IBoardTraveler;
  residents: IBoardAreaResident[];
  get position(): ICubeCoordinates;
  traverseNestedAreas<T extends INestedArea>(cb: (area: T) => void)
}

export interface INestedBoardAreaDeclaration extends IEntityDeclaration{
  id: Guid;
  nestedAreas?: INestedAreaDeclaration[];
  isNestedBoardArea: true;
  unlockWhen: IEventListenerDeclaration<unknown>[];
  isUnlocked: boolean;
}