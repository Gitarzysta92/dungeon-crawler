import { Guid } from "../../../lib/infrastructure/extensions/types";
import { AreaService } from "../../../lib/modules/areas/areas.service";
import { IDungeonArea } from "./mixins/dungeon-area/dungeon-area.interface";

export class DungeonService {

  constructor(
    private readonly _areaService: AreaService
  ) { }
  

  public getDungeon(areaId: Guid, dungeonId: Guid): IDungeonArea | undefined {
    let area = this._areaService.getArea<IDungeonArea>(a => areaId === a.id);
    if (!area || !dungeonId) {
      return;
    }

    if (area.isDungeonArea && area.dungeonId === dungeonId) {
      return area;
    }

    this._areaService.traverseNestedAreas(area, a => {
      if (a.dungeonId === dungeonId) {
        area = a;
      }
    })
    return area;
  }

  
}