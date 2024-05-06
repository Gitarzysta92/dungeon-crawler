import { EntityService } from "../../../lib/base/entity/entity.service";
import { IState } from "../../../lib/base/state/state.interface";
import { ISerializable } from "../../../lib/extensions/json-serializer";
import { AbilitiesService } from "../../../lib/modules/abilities/abilities.service";
import { ActorsService } from "../../../lib/modules/actors/actors.service";
import { BoardService } from "../../../lib/modules/board/board.service";
import { EffectService } from "../../../lib/modules/effects/effects.service";
import { QuestService } from "../../../lib/modules/quest/quest.service";
import { RewardService } from "../../../lib/modules/rewards/rewards.service";
import { TurnBasedGameplayService } from "../../../lib/modules/turn-based-gameplay/turn-based-gameplay.service";
import { TradeService } from "../../../lib/modules/vendors/vendors.service";
import { IActivity } from "../../../lib/base/activity/activity.interface";
import { IDungeonGameplayStateDto } from "./dungeon-gameplay.interface";


export class DungeonGameplayLogicState implements IState, ISerializable<IDungeonGameplayStateDto> {

  public id: string;

  // DungeonState section
  public get players() { return this.gameplayService.state.players };
  public get currentPlayerId() { return this.gameplayService.state.currentPlayerId };
  public get playersNumber() { return this.gameplayService.state.players.length };
  public get turn() { return this.gameplayService.state.turn };
  public get round() { return this.gameplayService.state.round };
  
  // ActorsState section
  public get actors() { return this.actorsService.getAllActors() };

  // BoardState section
  public get fields() { return this.boardService.getFields() };
  public get objects() { return this.boardService.getObjects() };

  // EffectsState section
  public get lastingEffects() { return this.effectsService };

  // QuestsState section
  // public get activeQuests() { return this._questsService.activeQuests };
  public get finishedQuestIds() { return this.finishedQuestIds };
  
  // RevertableState section
  public changesHistory: IActivity[];
  public prevStep: IDungeonGameplayStateDto | null;

  constructor(
    public readonly entityService: EntityService,
    public readonly gameplayService: TurnBasedGameplayService,
    public readonly actorsService: ActorsService,
    public readonly boardService: BoardService,
    public readonly effectsService: EffectService,
    public readonly questsService: QuestService,
    public readonly abilitiesService: AbilitiesService,
    public readonly tradingService: TradeService,
    public readonly rewardService: RewardService,
  ) { }
  
  public async onPostDirectiveDispatched(): Promise<void> {
    this.rewardService.claimRewards();
    this.actorsService.tryRemoveDefeatedActors();
  }

  public toJSON(): IDungeonGameplayStateDto {
    throw new Error("Method not implemented.");
  }

  public isDungeonFinished(): boolean {
    throw new Error("Method not implemented.");
  }
}