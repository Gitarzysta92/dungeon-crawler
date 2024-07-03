import { IState } from "../../../../../helpers/dispatcher/state.interface"
import { IActivity, IActivitySubject } from "../../../../../lib/base/activity/activity.interface"
import { IEntity } from "../../../../../lib/base/entity/entity.interface"
import { EntityService } from "../../../../../lib/base/entity/entity.service"
import { IPawn } from "../../../../../lib/base/pawn/pawn.interface"
import { Constructor } from "../../../../../lib/infrastructure/extensions/types"
import { IMixin, IMixinFactory } from "../../../../../lib/infrastructure/mixin/mixin.interface"
import { IAbilityPerformer } from "../../../../../lib/modules/abilities/entities/performer/ability-performer.interface"
import { ActorsService } from "../../../../../lib/modules/actors/actors.service"
import { AreaService } from "../../../../../lib/modules/areas/areas.service"
import { INestedArea } from "../../../../../lib/modules/areas/entities/area/area.interface"
import { ITraveler } from "../../../../../lib/modules/areas/entities/traveler/traveler.interface"
import { IBoardAssignment, IBoardObject } from "../../../../../lib/modules/board/entities/board-object/board-object.interface"
import { ContinuousGameplayService } from "../../../../../lib/modules/continuous-gameplay/continuous-gameplay.service"
import { EffectService } from "../../../../../lib/modules/effects/effects.service"
import { IInventoryBearer } from "../../../../../lib/modules/items/entities/bearer/inventory-bearer.interface"
import { IProgressable } from "../../../../../lib/modules/progression/entities/progressable.interface"
import { QuestService } from "../../../../../lib/modules/quest/quest.service"
import { TradeService } from "../../../../../lib/modules/vendors/vendors.service"
import { IBoardArea } from "../../../board-areas/entities/board-area/board-area.interface"
import { IBoardAreaResident } from "../../../board-areas/entities/board-resident/resident.interface"
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
      public get entities(): Array<
        IEntity &
        Partial<IInventoryBearer & IAbilityPerformer & IProgressable & IActivitySubject & IBoardObject & IBoardAssignment & IBoardArea>> {
        return entityService.getAllEntities();
      };
      public get unlockedAreaIds() { return areaService.getAvailableAreas() }
      public prevStep: IAdventureStateDeclaration | null;
      public get visitedDungeon() { return this.getSelectedPawn().visitedDungeon };

      constructor(state: IAdventureStateDeclaration & IState) { 
        super(state);
        this.id = state.id;
        this.prevStep = state.prevStep as IAdventureState & any;
      }
      
      public async hydrate(state: IAdventureStateDeclaration & IState): Promise<void> {
        gameplayService.hydrate(state);
        await entityService.hydrate(state);
      }

      public getPawns(): IHero[] {
        return [this.hero]
      }

      public getSelectedPawn(): IHero {
        return this.hero;
      }

      public getAvailableActivities(pawn: IPawn & IBoardObject): Array<IActivity> {
        const boardActivities = this.entities
          .filter(e => e.isBoardArea)
          .reduce((acc, e) => e.activities ? acc.concat(e.activities) : acc, []);
        
        const areaActivities = [];
        this.entities.filter(e => e.isBoardArea && pawn.isAssigned(e.position))
          .forEach(a => a.traverseNestedAreas<INestedArea & IActivitySubject>(na => {
            na.activities?.forEach(a => areaActivities.push(a));
          }))

        const residentActivities = this.entities
          .filter(e => e.isBoardArea && pawn.isAssigned(e.position))
          .reduce((acc, e) => e.residents
            .reduce((acc, r: IActivitySubject & IBoardAreaResident) => acc.concat(r.activities), [])
            .concat(acc), []);
                
        return [...boardActivities, ...areaActivities, ...residentActivities].filter(a => pawn.canPerform(a));
      }

      public toJSON(): IAdventureStateDeclaration {
        return Object.assign(Object.fromEntries(Object.entries(this)) as any, {
          entities: entityService.getAllEntities(),
          currentDay: this.currentDay,
          player: this.player,
          visitedDungeonAreaId: this.getSelectedPawn().visitedDungeonId
        })
      }

    }
    return AdventureState
  }
}