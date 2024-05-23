import { IDispatcherDirective, IState } from "../../../../../helpers/dispatcher/state.interface";

import { IActivity } from "../../../../../lib/base/activity/activity.interface";
import { IEntityDeclaration } from "../../../../../lib/base/entity/entity.interface";
import { EntityService } from "../../../../../lib/base/entity/entity.service";
import { ISerializable } from "../../../../../lib/infrastructure/extensions/json-serializer";
import { Constructor } from "../../../../../lib/infrastructure/extensions/types";
import { IMixinFactory, IMixin } from "../../../../../lib/infrastructure/mixin/mixin.interface";

import { AbilitiesService } from "../../../../../lib/modules/abilities/abilities.service";
import { ActorsService } from "../../../../../lib/modules/actors/actors.service";
import { BoardService } from "../../../../../lib/modules/board/board.service";
import { EffectService } from "../../../../../lib/modules/effects/effects.service";
import { QuestService } from "../../../../../lib/modules/quest/quest.service";
import { RewardService } from "../../../../../lib/modules/rewards/rewards.service";
import { ITurnGameplayPlayer } from "../../../../../lib/modules/turn-based-gameplay/entities/turn-based-player/turn-based-player.interface";
import { TurnBasedGameplayService } from "../../../../../lib/modules/turn-based-gameplay/turn-based-gameplay.service";
import { TradeService } from "../../../../../lib/modules/vendors/vendors.service";
import { IDungeonState, IDungeonStateDeclaration } from "./dungeon-state.interface";


export class DungeonStateFactory implements IMixinFactory<IDungeonState> {

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
  ) {}

  public validate(e: IDungeonState): boolean {
    return e.isDungeonState;
  }

  public create(e: Constructor<IMixin>): Constructor<IDungeonState> {
    const gameplayService = this.gameplayService;
    const actorsService = this.actorsService;
    const boardService = this.boardService;
    const effectsService = this.effectsService;
    const rewardService = this.rewardService;

    class DungeonState extends e implements IDungeonState, ISerializable<IDungeonStateDeclaration>, IState {

      isDungeonState: true;
      entities: IEntityDeclaration[];
      order: string[];

      public id: string;
    
      // DungeonState section
      public get players() { return gameplayService.state.players };
      public get currentPlayerId() { return gameplayService.state.currentPlayerId };
      public get playersNumber() { return gameplayService.state.players.length };
      public get turn() { return gameplayService.state.turn };
      public get round() { return gameplayService.state.round };
      
      // ActorsState section
      public get actors() { return actorsService.getAllActors() };
    
      // BoardState section
      public get fields() { return boardService.getFields() };
      public get objects() { return boardService.getObjects() };
    
      // EffectsState section
      public get lastingEffects() { return effectsService };
    
      // QuestsState section
      // public get activeQuests() { return this._questsService.activeQuests };
      public get finishedQuestIds() { return this.finishedQuestIds };
      
      // RevertableState section
      public changesHistory: IActivity[];
      public prevStep: IDungeonStateDeclaration | null;
    
      constructor(d: IDungeonStateDeclaration) { 
        super(d);
      }
      getCurrentPlayer(): ITurnGameplayPlayer {
        throw new Error("Method not implemented.");
      }
      onBeforeDirectiveDispatched?(d: IDispatcherDirective<unknown>): Promise<void> {
        throw new Error("Method not implemented.");
      }
      
      public async onPostDirectiveDispatched(): Promise<void> {
        rewardService.claimRewards();
        actorsService.tryRemoveDefeatedActors();
      }
    
      public toJSON(): IDungeonStateDeclaration {
        throw new Error("Method not implemented.");
      }
    
      public isDungeonFinished(): boolean {
        throw new Error("Method not implemented.");
      }
    }
    return DungeonState;
  }

}
