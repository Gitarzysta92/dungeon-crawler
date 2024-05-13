import { AreaService } from "../../../lib/modules/areas/areas.service";
import { IDungeonCrawler } from "./dungeon.interface";
import { IDungeonArea } from "./mixins/dungeon-area/dungeon-area.interface";

export class DungeonService {
  constructor(
    private readonly _areaService: AreaService
  ) {}

  getVisitedDungeon(dungeonCrawler: IDungeonCrawler): IDungeonArea {
    return this._areaService.getArea(a => dungeonCrawler.occupiedAreaId === a.id && a.isDungeonArea)
  }
}