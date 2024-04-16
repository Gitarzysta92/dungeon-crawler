import { Guid } from "../../../lib/extensions/types";
import { ITraveler } from "../../../lib/modules/areas/entities/traveler/traveler.interface";
import { IDungeonArea, IDungeonAreaDeclaration } from "./entities/dungeon-area/dungeon-area.interface";

export interface IDungeonDataFeed {
  getDungeonTemplates: (ids?: Guid[]) => Promise<IDungeonAreaDeclaration[]>;
  getDungeonTemplate: (id: Guid) => Promise<IDungeonAreaDeclaration>;
}

export interface IDungeonCrawler extends ITraveler {
  id: Guid;
  visitedDungeonId: Guid;
}