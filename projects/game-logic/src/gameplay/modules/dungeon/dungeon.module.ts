import { EntityService } from "../../../lib/base/entity/entity.service";
import { AbilitiesService } from "../../../lib/modules/abilities/abilities.service";
import { ActorsService } from "../../../lib/modules/actors/actors.service";
import { AreaService } from "../../../lib/modules/areas/areas.service";
import { BoardService } from "../../../lib/modules/board/board.service";
import { EffectService } from "../../../lib/modules/effects/effects.service";
import { QuestService } from "../../../lib/modules/quest/quest.service";
import { RewardService } from "../../../lib/modules/rewards/rewards.service";
import { TurnBasedGameplayService } from "../../../lib/modules/turn-based-gameplay/turn-based-gameplay.service";
import { TradeService } from "../../../lib/modules/vendors/vendors.service";
import { DungeonService } from "./dungeon.service";
import { DungeonAreaFactory } from "./mixins/dungeon-area/dungeon-area";
import { DungeonStateFactory } from "./mixins/dungeon-state/dungeon-state.factory";

export class DungeonModule {
  constructor(
    private readonly _entityService: EntityService,
    private readonly _areaService: AreaService,
    private readonly _gameplayService: TurnBasedGameplayService,
    private readonly _actorsService: ActorsService,
    private readonly _boardService: BoardService,
    private readonly _effectsService: EffectService,
    private readonly _questsService: QuestService,
    private readonly _abilitiesService: AbilitiesService,
    private readonly _tradingService: TradeService,
    private readonly _rewardService: RewardService,
  ) { }
  
  public initialize() {
    const dungeonService = new DungeonService(this._areaService);
    this._entityService.useFactories([
      new DungeonAreaFactory(dungeonService),
      new DungeonStateFactory(
        this._entityService,
        this._gameplayService,
        this._actorsService,
        this._boardService,
        this._effectsService,
        this._questsService,
        this._abilitiesService,
        this._tradingService,
        this._rewardService)
    ]);
    return { dungeonService };
  }
}