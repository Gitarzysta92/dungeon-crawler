import { ActivityService } from "../../../lib/base/activity/activity.service";
import { EntityService } from "../../../lib/base/entity/entity.service";
import { AreaService } from "../../../lib/modules/areas/areas.service";
import { EnterDungeonActivityFactory } from "./activities/enter-dungeon/enter-dungeon.activity";
import { LeaveDungeonActivityFactory } from "./activities/leave-dungeon/leave-dungeon.activity";
import { DungeonService } from "./dungeon.service";
import { DungeonAreaFactory } from "./mixins/dungeon-area/dungeon-area.factory";
import { DungeonCrawlerFactory } from "./mixins/dungeon-crawler/dungeon-crawler.factory";
import { DungeonPlayerMixin } from "./mixins/dungeon-player/dungeon-player.mixin";

export class DungeonModule {
  constructor(
    private readonly _entityService: EntityService,
    private readonly _areaService: AreaService,
    // private readonly _gameplayService: TurnBasedGameplay,
    // private readonly _actorsService: ActorsService,
    // private readonly _boardService: BoardService,
    // private readonly _questsService: QuestService,
    // private readonly _abilitiesService: AbilitiesService,
    // private readonly _tradingService: TradeService,
    // private readonly _rewardService: RewardService,
    private readonly _activitiesService: ActivityService
  ) { }
  
  public initialize() {
    const dungeonService = new DungeonService(this._areaService);
    this._entityService.useFactories([
      new DungeonAreaFactory(),
      new DungeonCrawlerFactory(dungeonService),
      new DungeonPlayerMixin()
    ]);

    this._activitiesService.useFactories([
      new EnterDungeonActivityFactory(),
      new LeaveDungeonActivityFactory()
    ])

    return { dungeonService };
  }
}