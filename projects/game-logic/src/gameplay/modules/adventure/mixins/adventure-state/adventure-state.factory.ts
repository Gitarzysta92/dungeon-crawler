import { IState } from "../../../../../helpers/dispatcher/state.interface"
import { IActivity, IActivitySubject } from "../../../../../lib/base/activity/activity.interface"
import { IEntityDeclaration } from "../../../../../lib/base/entity/entity.interface"
import { EntityService } from "../../../../../lib/base/entity/entity.service"
import { IPawn } from "../../../../../lib/base/pawn/pawn.interface"
import { Constructor } from "../../../../../lib/infrastructure/extensions/types"
import { IMixin, IMixinFactory } from "../../../../../lib/infrastructure/mixin/mixin.interface"
import { IAbilityPerformer } from "../../../../../lib/modules/abilities/entities/performer/ability-performer.interface"
import { ActorsService } from "../../../../../lib/modules/actors/actors.service"
import { AreaService } from "../../../../../lib/modules/areas/areas.service"
import { ITraveler } from "../../../../../lib/modules/areas/entities/traveler/traveler.interface"
import { ContinuousGameplayService } from "../../../../../lib/modules/continuous-gameplay/continuous-gameplay.service"
import { EffectService } from "../../../../../lib/modules/effects/effects.service"
import { IInventoryBearer } from "../../../../../lib/modules/items/entities/bearer/inventory-bearer.interface"
import { IProgressable } from "../../../../../lib/modules/progression/entities/progressable.interface"
import { QuestService } from "../../../../../lib/modules/quest/quest.service"
import { TradeService } from "../../../../../lib/modules/vendors/vendors.service"
import { DungeonService } from "../../../dungeon/dungeon.service"
import { IHero } from "../../../heroes/mixins/hero/hero.interface"
import { IAdventureState, IAdventureStateDeclaration } from "./adventure-state.interface"


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
      public get player() { return gameplayService.player };
      public get currentDay() { return gameplayService.currentDay };
      //public get activeQuests() { return this.questsService.activeQuests };
      public get finishedQuestIds() { return this.finishedQuestIds };
      public get hero(): IHero & ITraveler { return entityService.getEntity(e => e.isHero) }
      public get entities(): Array<IEntityDeclaration & Partial<IInventoryBearer & IAbilityPerformer & IProgressable & IActivitySubject>> {
        return entityService.getAllEntities();
      };
      public get unlockedAreaIds() { return areaService.getAvailableAreas() }
      public prevStep: IAdventureStateDeclaration | null;
      public get visitedDungeon() { return dungeonService.getVisitedDungeon(this.hero) }

      constructor(state: IAdventureStateDeclaration & IState) { 
        super(state);
        this.id = state.id;
        this.prevStep = state.prevStep as IAdventureState;
        gameplayService.hydrate(state);
        entityService.hydrate(state);
      }


      public getPawns(): IPawn[] {
        return [this.hero]
      }

      public getSelectedPawn(): IPawn {
        return this.hero;
      }

      public getAvailableActivities(hero: IHero): Array<IActivity> {
        return this.entities.reduce((acc, e) => acc.concat(e.activities ?? []), [])
          .filter(a => a.isActivity && a.canPerform(hero));
      }

      public toJSON(): IAdventureStateDeclaration {
        return Object.assign({
          entities: entityService.getAllEntities(),
          currentDay: this.currentDay,
          player: this.player
        }, this);
      }

    }
    return AdventureState
  }
}