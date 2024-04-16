import { EntityService } from "../../../lib/base/entity/entity.service";
import { AreaService } from "../../../lib/modules/areas/areas.service";
import { DungeonAreaFactory } from "./entities/dungeon-area/dungeon-area";
import { DungeonService } from "./dungeon.service";

export class DungeonModule {
  constructor(
    private readonly _entityService: EntityService,
    private readonly _areaService: AreaService
  ) { }
  
  public initialize() {
    const dungeonService = new DungeonService(this._areaService);
    this._entityService.useFactories([new DungeonAreaFactory(dungeonService)]);
    return { dungeonService };
  }
}