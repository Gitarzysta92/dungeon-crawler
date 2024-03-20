import { EntityService } from "../../../lib/base/entity/entity.service";
import { IDispatcherDirective, IState } from "../../../lib/base/state/state.interface";
import { ISerializable } from "../../../lib/extensions/json-serializer";
import { AbilitiesService } from "../../../lib/modules/abilities/abilities.service";
import { ActorsService } from "../../../lib/modules/actors/actors.service";
import { BoardService } from "../../../lib/modules/board/board.service";
import { EffectService } from "../../../lib/modules/effects/effects.service";
import { QuestService } from "../../../lib/modules/quest/quest.service";
import { RewardService } from "../../../lib/modules/rewards/rewards.service";
import { TurnBasedGameplayService } from "../../../lib/modules/turn-based-gameplay/turn-based-gameplay.service";
import { TradeService } from "../../../lib/modules/vendors/vendors.service";
import { IActivity } from "../../activities/activity.interface";
import { IDungeonGameplayStateDto } from "./dungeon-gameplay.interface";


export class DungeonGameplay implements IState, ISerializable<IDungeonGameplayStateDto> {

  public id: string;

  // DungeonState section
  public get players() { return this._gameplayService.state.players };
  public get currentPlayerId() { return this._gameplayService.state.currentPlayerId };
  public get playersNumber() { return this._gameplayService.state.players.length };
  public get turn() { return this._gameplayService.state.turn };
  public get round() { return this._gameplayService.state.round };
  
  // ActorsState section
  public get actors() { return this._actorsService.getAllActors() };

  // BoardState section
  public get fields() { return this._boardService.getFields() };
  public get objects() { return this._boardService.getObjects() };

  // EffectsState section
  public get lastingEffects() { return this._effectsService };

  // QuestsState section
  // public get activeQuests() { return this._questsService.activeQuests };
  public get finishedQuestIds() { return this.finishedQuestIds };
  
  // RevertableState section
  public changesHistory: IActivity<{ [key: string]: unknown; }>[];
  public prevState: IDungeonGameplayStateDto | null;

  constructor(
    private readonly _entityService: EntityService,
    private readonly _gameplayService: TurnBasedGameplayService,
    private readonly _actorsService: ActorsService,
    private readonly _boardService: BoardService,
    private readonly _effectsService: EffectService,
    private readonly _questsService: QuestService,
    private readonly _abilitiesService: AbilitiesService,
    private readonly _tradingService: TradeService,
    private readonly _rewardService: RewardService,
  ) { }
  
  public async onPostDirectiveDispatched(): Promise<void> {
    this._rewardService.claimRewards();
    this._actorsService.tryRemoveDefeatedActors();
  }

  public hydrate(data: IDungeonGameplayStateDto): void {
    this.id = data.id;
    this._entityService.hydrate(data)
    this._gameplayService.hydrate(data);
  }

  public toJSON(): IDungeonGameplayStateDto {
    throw new Error("Method not implemented.");
  }

  public isDungeonFinished(): boolean {
    throw new Error("Method not implemented.");
  }
}