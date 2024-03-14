
import { EntityService } from "../../../lib/base/entity/entity.service";
import { IState } from "../../../lib/base/state/state.interface";
import { InteractionsService } from "../../../lib/cross-cutting/interaction/interaction.service";
import { AbilitiesService } from "../../../lib/modules/abilities/abilities.service";
import { ActorsService } from "../../../lib/modules/actors/actors.service";
import { BoardService } from "../../../lib/modules/board/board.service";
import { EffectService } from "../../../lib/modules/effects/effects.service";
import { ItemsService } from "../../../lib/modules/items/items.service";
import { QuestService } from "../../../lib/modules/quest/quest.service";
import { RewardService } from "../../../lib/modules/rewards/rewards.service";
import { TradeService } from "../../../lib/modules/vendors/trade.service";
import { IActivity } from "../../shared/activities/activity.interface";
import { IDungeonGameplayState } from "./dungeon-gameplay.interface";


export class DungeonGameplay implements IState {

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
  public get activeQuests() { return this.questsService.activeQuests };
  public get finishedQuestIds() { return this.finishedQuestIds };
  
  // RevertableState section
  public changesHistory: IActivity<{ [key: string]: unknown; }>[];
  public prevState: IDungeonGameplayState | null;

  constructor(
    private readonly _entityService: EntityService,
    public readonly gameplayService: TurnBasedGameplayService,
    public readonly actorsService: ActorsService,
    public readonly boardService: BoardService,
    public readonly effectsService: EffectService,
    public readonly questsService: QuestService,
    public readonly abilitiesService: AbilitiesService,
    public readonly interactionService: InteractionsService,
    public readonly tradingService: TradeService,
    public readonly rewardService: RewardService,
    public readonly itemsService: ItemsService
  ) {}

  public hydrate(data: IDungeonGameplayState): void {
    this.id = data.id;
    this._entityService.hydrate(data)
    this.gameplayService.hydrate(data);
    this.boardService.hydrate(data);
    this.effectsService.hydrate(data);
    this.itemsService.hydrate(data);
  }

  public dehydrate(): IDungeonGameplayState {
    const state = {}; 
    this._entityService.dehydrate(state);
    this.gameplayService.dehydrate(state);
    this.boardService.dehydrate(state);
    this.effectsService.dehydrate(state);
    return state as IDungeonGameplayState;
  }

  public makePostActivityOperations(): void {
    this.rewardService.claimRewards();
    this.actorsService.tryRemoveDefeatedActors();
  }

  public tryFinishDungeon(): void {
    // if (this.hero.isDefeated()) {
    //   this.isDungeonFinished = true;
    // }
  }

  public applyTurnToChangeHistory(): void {
    // if (this.changesHistory[0]) {
    //   this.changesHistory[0].turn = this.turn
    // }
  }

  public setPerformerForLastActivity(): void {
    // const lastActivity = this.changesHistory[0];
    // if (!lastActivity) {
    //   return;
    // }
    // lastActivity.playerId = Object.keys(SystemActivityName)
    //   .includes(lastActivity.name) ? this.deck.id : this.hero.id;
  }

  public isDungeonFinished(): boolean {
    throw new Error("Method not implemented.");
  }
}