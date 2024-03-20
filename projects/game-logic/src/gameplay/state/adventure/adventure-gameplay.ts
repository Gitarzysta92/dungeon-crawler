import { IEntity } from "../../../lib/base/entity/entity.interface"
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
import { IActivity } from "../../activities/activity.interface"
import { IAdventureGameplayStateDto } from "./adventure-gameplay.interface"
import { ISerializable } from "../../../lib/extensions/json-serializer"
import { EntityService } from "../../../lib/base/entity/entity.service"

export class AdventureGameplay implements IState, ISerializable<IAdventureGameplayStateDto> {
  
  public id: string;

  // Gameplay section
  public get player() { return this._gameplayService.player };
  public get currentDay() { return this._gameplayService.currentDay };

  // QuestsState section
  //public get activeQuests() { return this.questsService.activeQuests };
  public get finishedQuestIds() { return this.finishedQuestIds };

  public get hero() { return {} }

  // ActorsState section
  public entities: Array<IEntity & Partial<IInventoryBearer & IAbilityPerformer & IProgressable>>;

  // TravelState section
  public get unlockedAreaIds() { return this._areaService.unlockedAreaIds }

  // RevertableState section
  public changesHistory: IActivity<{ [key: string]: unknown; }>[];
  public prevState: IAdventureGameplayStateDto | null;

  constructor(
    private readonly _entityService: EntityService,
    private readonly _gameplayService: ContinuousGameplayService,
    private readonly _actorsService: ActorsService,
    private readonly _questsService: QuestService,
    private readonly _areaService: AreaService,
    private readonly _tradingService: TradeService,
    private readonly _effectsService: EffectService
  ) { }

  public hydrate(data: IAdventureGameplayStateDto): void {
    this.id = data.id;
  }

  public toJSON(): IAdventureGameplayStateDto {
    return {
      id: this.id,
      entities: this._entityService.getAllEntities(),
    } as IAdventureGameplayStateDto;
  }

}