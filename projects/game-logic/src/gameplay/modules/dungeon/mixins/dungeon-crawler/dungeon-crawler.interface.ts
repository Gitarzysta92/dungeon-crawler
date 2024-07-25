
import { IActivityDoer } from "../../../../../lib/base/activity/activity.interface";
import { IEntityDeclaration } from "../../../../../lib/base/entity/entity.interface";
import { Guid } from "../../../../../lib/infrastructure/extensions/types";
import { IBoardObject, IBoardObjectDeclaration } from "../../../../../lib/modules/board/entities/board-object/board-object.interface";
import { IBoardTraveler } from "../../../board-areas/entities/board-traveler/board-traveler.interface";
import { IDungeonArea } from "../dungeon-area/dungeon-area.interface";


export interface IDungeonCrawler extends IDungeonCrawlerDeclaration, IActivityDoer, IBoardTraveler {
  visitedDungeonId: Guid;
  visitedDungeon: IDungeonArea;
  enterDungeon(d: IDungeonArea): void;
  leaveDungeon(d: IDungeonArea): void;
}


export interface IDungeonCrawlerDeclaration extends IEntityDeclaration, IBoardObjectDeclaration {
  isDungeonCrawler: true;
}