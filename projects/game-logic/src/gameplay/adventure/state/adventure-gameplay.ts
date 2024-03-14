import { IEntity } from "../../../lib/base/entity/entity.interface"
import { IState } from "../../../lib/base/state/state.interface"
import { InteractionsService } from "../../../lib/cross-cutting/interaction/interaction.service"
import { IAbilityPerformer } from "../../../lib/modules/abilities/entities/performer/ability-performer.interface"
import { ActorsService } from "../../../lib/modules/actors/actors.service"
import { AreaService } from "../../../lib/modules/areas/areas.service"
import { EffectService } from "../../../lib/modules/effects/effects.service"
import { IInventoryBearer } from "../../../lib/modules/items/entities/bearer/inventory-bearer.interface"
import { ContinuousGameplayService } from "../../../lib/modules/continuous-gameplay/continuous-gameplay.service"
import { IProgressable } from "../../../lib/modules/progression/entities/progressable.interface"
import { QuestService } from "../../../lib/modules/quest/quest.service"
import { TradeService } from "../../../lib/modules/vendors/trade.service"
import { IActivity } from "../../shared/activities/activity.interface"
import { IAdventureGameplayState } from "./adventure-gameplay.interface"

export class AdventureGameplay implements IAdventureGameplayState, IState {
  
  // Gameplay section
  public get player() { return this.gameplayService.player };
  public get currentDay() { return this.gameplayService.currentDay };

  // QuestsState section
  public get activeQuests() { return this.questsService.activeQuests };
  public get finishedQuestIds() { return this.finishedQuestIds };

  public get hero() { return {} }

  // ActorsState section
  public entities: Array<IEntity & Partial<IInventoryBearer & IAbilityPerformer & IProgressable>>;

  // TravelState section
  public get unlockedAreaIds() { return this.areaService.unlockedAreaIds }

  // RevertableState section
  public changesHistory: IActivity<{ [key: string]: unknown; }>[];
  public prevState: IAdventureGameplayState | null;

  constructor(
    public readonly interactionService: InteractionsService,
    public readonly gameplayService: ContinuousGameplayService,
    public readonly actorsService: ActorsService,
    public readonly questsService: QuestService,
    public readonly areaService: AreaService,
    public readonly tradingService: TradeService,
    public readonly effectsService: EffectService
  ) { }
}



// export class AdventureGlobalState implements IRevertableState, IAdventureGlobalState {
//   public getAllCharactersFromOccupiedArea(): (ICharacter & { inventory: Inventory, assignedAreaId: string, quests: IQuest[] })[] {
//     const availableAreas = this.adventureMap.getAllAvailableAreasRelatedToArea(this.hero.occupiedAreaId);
//     return Object.values(this.characters).filter(c => availableAreas.some(a => a.id === c.assignedAreaId));
//   }

//   public getCharacterFromOccupiedArea(character: ICharacter): (ICharacter & { inventory: Inventory, assignedAreaId: string, quests: IQuest[] }) | undefined {
//     return this.getAllCharactersFromOccupiedArea().find(c => c.id === character.id);
//   }
// }