import { Guid } from "../../../lib/extensions/types";
import { IDungeonTemplate } from "./entities/dungeon-area/dungeon-area.interface";

export interface IDungeonDataFeed {
  getDungeonTemplates: (ids?: Guid[]) => Promise<IDungeonTemplate[]>;
  getDungeonTemplate: (id: Guid) => Promise<IDungeonTemplate>;
}

