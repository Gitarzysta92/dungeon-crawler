
import { EntityService } from "../../../lib/base/entity/entity.service";
import { MixinService } from "../../../lib/infrastructure/mixin/mixin.service";
import { ActorsService } from "../../../lib/modules/actors/actors.service";
import { AreaService } from "../../../lib/modules/areas/areas.service";
import { ContinuousGameplayService } from "../../../lib/modules/continuous-gameplay/continuous-gameplay.service";
import { EffectService } from "../../../lib/modules/effects/effects.service";
import { QuestService } from "../../../lib/modules/quest/quest.service";
import { TradeService } from "../../../lib/modules/vendors/vendors.service";
import { DungeonService } from "../dungeon/dungeon.service";

import { AdventureMapFactory } from "./mixins/adventure-map/adventure-map.factory";
import { AdventureStateFactory } from "./mixins/adventure-state/adventure-state.factory";

export class AdventureModule {
  constructor(
    private readonly _mixinFactory: MixinService,
    public readonly entityService: EntityService,
    public readonly gameplayService: ContinuousGameplayService,
    public readonly actorsService: ActorsService,
    public readonly questsService: QuestService,
    public readonly areaService: AreaService,
    public readonly tradingService: TradeService,
    public readonly effectsService: EffectService,
    public readonly dungeonService: DungeonService
  ) { }
  
  public initialize() {
    this._mixinFactory.useFactories([
      new AdventureMapFactory(),
      new AdventureStateFactory(
        this.entityService,
        this.gameplayService,
        this.actorsService,
        this.questsService,
        this.areaService,
        this.tradingService,
        this.effectsService,
        this.dungeonService)
    ])
    
    return {};
  }
}