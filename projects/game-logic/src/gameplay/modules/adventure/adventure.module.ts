
import { EntityService } from "../../../lib/base/entity/entity.service";
import { MixinService } from "../../../lib/infrastructure/mixin/mixin.service";
import { ActorsService } from "../../../lib/modules/actors/actors.service";
import { AreaService } from "../../../lib/modules/areas/areas.service";
import { QuestService } from "../../../lib/modules/quest/quest.service";
import { TradeService } from "../../../lib/modules/vendors/vendors.service";
import { DungeonService } from "../dungeon/dungeon.service";



export class AdventureModule {
  constructor(
    private readonly _mixinFactory: MixinService,
    public readonly entityService: EntityService,
    public readonly actorsService: ActorsService,
    public readonly questsService: QuestService,
    public readonly areaService: AreaService,
    public readonly tradingService: TradeService,
    public readonly dungeonService: DungeonService
  ) { }
  
  public initialize() {

    
    return {};
  }
}