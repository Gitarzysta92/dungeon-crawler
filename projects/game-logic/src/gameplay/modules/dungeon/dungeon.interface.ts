import { Guid } from "../../../lib/extensions/types";
import { IDungeonArea } from "./entities/dungeon-area/dungeon-area.interface";

export interface IDungeonDataFeed {
  getDungeonAreas: (ids?: Guid[]) => Promise<IDungeonArea[]>;
  getDungeonArea: (id: Guid) => Promise<IDungeonArea>;
}

