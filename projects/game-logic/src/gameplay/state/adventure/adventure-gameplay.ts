import { IEntityDeclaration } from "../../../lib/base/entity/entity.interface"
import { IState } from "../../../lib/base/state/state.interface"
import { IAbilityPerformer } from "../../../lib/modules/abilities/entities/performer/ability-performer.interface"
import { ActorsService } from "../../../lib/modules/actors/actors.service"
import { AreaService } from "../../../lib/modules/areas/areas.service"
import { EffectService } from "../../../lib/modules/effects/effects.service"
import { IInventoryBearer } from "../../../lib/modules/items/entities/bearer/inventory-bearer.interface"
import { ContinuousGameplayService } from "../../../lib/modules/continuous-gameplay/continuous-gameplay.service"
import { IProgressable } from "../../../lib/modules/progression/entities/progressable.interface"
import { QuestService } from "../../../lib/modules/quest/quest.service"
import { TradeService } from "../../../lib/modules/vendors/vendors.service"
import { IAdventureGameplayStateDto } from "./adventure-gameplay.interface"
import { ISerializable } from "../../../lib/extensions/json-serializer"
import { EntityService } from "../../../lib/base/entity/entity.service"
import { IHero } from "../../modules/heroes/entities/hero/hero.interface"
import { ITraveler } from "../../../lib/modules/areas/entities/traveler/traveler.interface"
import { DungeonService } from "../../modules/dungeon/dungeon.service"
import { IActivity } from "../../../lib/base/activity/activity.interface"

export class AdventureGameplayLogicState implements IState, ISerializable<IAdventureGameplayStateDto> {
  
  public id: string;

  // Gameplay section
  public get player() { return this.gameplayService.player };
  public get currentDay() { return this.gameplayService.currentDay };

  // QuestsState section
  //public get activeQuests() { return this.questsService.activeQuests };
  public get finishedQuestIds() { return this.finishedQuestIds };

  public get hero(): IHero & ITraveler { return {} as IHero & ITraveler }

  // ActorsState section
  public entities: Array<IEntityDeclaration & Partial<IInventoryBearer & IAbilityPerformer & IProgressable>>;

  // TravelState section
  public get unlockedAreaIds() { return this.areaService.getAvailableAreas() }

  // RevertableState section
  public changesHistory: IActivity[];
  public prevState: IAdventureGameplayStateDto | null;

  public get visitedDungeon() { return this.dungeonService.getVisitedDungeon(this.hero) }

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

  public hydrate(data: IAdventureGameplayStateDto): void {
    this.id = data.id;
  }

  public toJSON(): IAdventureGameplayStateDto {
    return {
      id: this.id,
      entities: this.entityService.getAllEntities(),
    } as IAdventureGameplayStateDto;
  }

}