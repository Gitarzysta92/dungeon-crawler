import { IEntity } from "../../../lib/base/entity/entity.interface";
import { EntityService } from "../../../lib/base/entity/entity.service";
import { InteractionsService } from "../../../lib/cross-cutting/interaction/interaction.service";
import { AbilityService } from "../../../lib/modules/ability/ability.service";
import { ActorsService } from "../../../lib/modules/actor/actor.service";
import { BoardService } from "../../../lib/modules/board/board.service";
import { EffectService } from "../../../lib/modules/effect/effect.service";
import { TurnBasedGameplayService } from "../../../lib/modules/playstyle/turn-based/turn-based-gameplay.service";
import { QuestService } from "../../../lib/modules/quest/quest.service";
import { RewardService } from "../../../lib/modules/reward/reward.service";
import { TradeService } from "../../../lib/modules/trade/trade.service";
import { DungeonGameplay } from "./dungeon-gameplay";
import { IDungeonGameplayState, IDungeonGameplayFeed, IDungeonGameplayPayload } from "./dungeon-gameplay.interface";
import { IDungeonTemplate } from "../dungeons.interface";



export class DungeonGameplayFactory {

  constructor(
    private readonly _entityService: EntityService,
    private readonly _turnBasedGameplayService: TurnBasedGameplayService,
    private readonly _actorsService: ActorsService,
    private readonly _boardService: BoardService,
    private readonly _effectsService: EffectService,
    private readonly _questsService: QuestService,
    private readonly _abilitiesService: AbilityService,
    private readonly _interactionService: InteractionsService,
    private readonly _tradeService: TradeService,
    private readonly _rewardService: RewardService,
    private readonly _dataService: IDungeonGameplayFeed
  ) {}


  public async create(data: IDungeonGameplayPayload): Promise<DungeonGameplay> {
    const state = await this.build(data);
    return this.initialize(state);
  }

  public async initialize(data: IDungeonGameplayState): Promise<DungeonGameplay> {
    const state = new DungeonGameplay(
      this._entityService,
      this._turnBasedGameplayService,
      this._actorsService,
      this._boardService,
      this._effectsService,
      this._questsService,
      this._abilitiesService,
      this._interactionService,
      this._tradeService,
      this._rewardService
    );

    state.hydrate(data);
    return state;
  }

  public async build(data: IDungeonGameplayPayload): Promise<IDungeonGameplayState> {
    const dungeonTemplate = await this._dataService.getDungeonGameplayTemplate(data.dungeonId);
    const heroes = this._initializeHeroes(data, dungeonTemplate);
    const players = data.players.concat(dungeonTemplate.predefinedPlayers);

    return {
      id: dungeonTemplate.id,
      entities: (dungeonTemplate.actors as IEntity[]).concat(heroes),
      playersNumber: dungeonTemplate.playersNumber,
      players: players
    }
  }

  private _initializeHeroes(data: IDungeonGameplayPayload, t: IDungeonTemplate): IEntity[] {
    const heroes = data.entities.filter(h => data.players.some(p => p.groupId === h.groupId));
    if (t.spawnPoints.length < heroes.length) {
      throw new Error("To many heroes selected for given dungeon'");
    }
    heroes.forEach((h, i) => Object.assign(h, t.spawnPoints[i]))
    return heroes 
  }
}