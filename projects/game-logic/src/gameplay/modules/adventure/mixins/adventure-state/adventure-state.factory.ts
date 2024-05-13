import { IEntityDeclaration } from "../../../../../lib/base/entity/entity.interface"
import { IAbilityPerformer } from "../../../../../lib/modules/abilities/entities/performer/ability-performer.interface"
import { ActorsService } from "../../../../../lib/modules/actors/actors.service"
import { AreaService } from "../../../../../lib/modules/areas/areas.service"
import { EffectService } from "../../../../../lib/modules/effects/effects.service"
import { IInventoryBearer } from "../../../../../lib/modules/items/entities/bearer/inventory-bearer.interface"
import { ContinuousGameplayService } from "../../../../../lib/modules/continuous-gameplay/continuous-gameplay.service"
import { IProgressable } from "../../../../../lib/modules/progression/entities/progressable.interface"
import { QuestService } from "../../../../../lib/modules/quest/quest.service"
import { TradeService } from "../../../../../lib/modules/vendors/vendors.service"
import { IAdventureState, IAdventureStateDeclaration } from "./adventure-state.interface"
import { EntityService } from "../../../../../lib/base/entity/entity.service"
import { IHero } from "../../../heroes/mixins/hero/hero.interface"
import { ITraveler } from "../../../../../lib/modules/areas/entities/traveler/traveler.interface"
import { DungeonService } from "../../../dungeon/dungeon.service"
import { IActivity } from "../../../../../lib/base/activity/activity.interface"
import { IMixin, IMixinFactory } from "../../../../../lib/base/mixin/mixin.interface"
import { Constructor } from "../../../../../lib/extensions/types"


export class AdventureStateFactory implements IMixinFactory<IAdventureState>  {

  constructor(
    public readonly entityService: EntityService,
    public readonly gameplayService: ContinuousGameplayService,
    public readonly actorsService: ActorsService,
    public readonly questsService: QuestService,
    public readonly areaService: AreaService,
    public readonly tradingService: TradeService,
    public readonly effectsService: EffectService,
    public readonly dungeonService: DungeonService
  ) { }
    
  public validate(e: IAdventureState): boolean {
    return e.isAdventureState;
  };

  public create(e: Constructor<IMixin>): Constructor<IAdventureState> {
    const entityService = this.entityService;
    const gameplayService = this.gameplayService;
    const areaService = this.areaService;
    const dungeonService = this.dungeonService;

    class AdventureState extends e implements IAdventureState {
      public id: string;
      public isAdventureState = true as const

      // Gameplay section
      public get player() { return gameplayService.player };
      public get currentDay() { return gameplayService.currentDay };
    
      // QuestsState section
      //public get activeQuests() { return this.questsService.activeQuests };
      public get finishedQuestIds() { return this.finishedQuestIds };
    
      public get hero(): IHero & ITraveler { return {} as IHero & ITraveler }
    
      // ActorsState section
      public entities: Array<IEntityDeclaration & Partial<IInventoryBearer & IAbilityPerformer & IProgressable>>;
    
      // TravelState section
      public get unlockedAreaIds() { return areaService.getAvailableAreas() }
    
      // RevertableState section
      public changesHistory: IActivity[];
      public prevStep: IAdventureStateDeclaration | null;
    
      public get visitedDungeon() { return dungeonService.getVisitedDungeon(this.hero) }

      constructor(d: IAdventureStateDeclaration) { 
        super(d);
      }

      public toJSON(): IAdventureStateDeclaration {
        return {
          id: this.id,
          entities: entityService.getAllEntities(),
        } as IAdventureStateDeclaration;
      }

    }
    return AdventureState
  }
}