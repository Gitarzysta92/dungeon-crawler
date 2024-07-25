import { IActivityDoer } from "../../../../../lib/base/activity/activity.interface";
import { IEntityDeclaration } from "../../../../../lib/base/entity/entity.interface";
import { IBoardObjectDeclaration } from "../../../../../lib/modules/board/entities/board-object/board-object.interface";
import { IBoardTraveler } from "../../../board-areas/entities/board-traveler/board-traveler.interface";


export interface IDungeonMaster extends IDungeonMasterDeclaration, IActivityDoer, IBoardTraveler {
}


export interface IDungeonMasterDeclaration extends IEntityDeclaration, IBoardObjectDeclaration {
  isDungeonMaster: true;
}