
import { IActivityDoer } from "../../../../../lib/base/activity/activity.interface";
import { IEntity } from "../../../../../lib/base/entity/entity.interface";
import { Constructor } from "../../../../../lib/infrastructure/extensions/types";
import { IMixinFactory } from "../../../../../lib/infrastructure/mixin/mixin.interface";
import { IBoardTraveler } from "../../../board-areas/entities/board-traveler/board-traveler.interface";
import { DungeonService } from "../../dungeon.service";
import { IDungeonArea } from "../dungeon-area/dungeon-area.interface";
import { IDungeonMaster, IDungeonMasterDeclaration } from "./dungeon-master.interface";

export class DungeonMasterFactory implements IMixinFactory<IDungeonMaster> {

  constructor(
    private readonly _dungeonService: DungeonService
  ) { }

  public isApplicable(e: IDungeonMaster ): boolean {
    return e.isDungeonMaster && e.isTraveler
  };

  public create(e: Constructor<IEntity & IActivityDoer & IBoardTraveler>): Constructor<IDungeonMaster> {
    const dungeonService = this._dungeonService;
    return class DungeonMaster extends e implements IDungeonMaster {
      
      public isDungeonMaster = true as const;

      constructor(d: IDungeonMasterDeclaration & any) {
        super(d);
      }

    }
  };
}