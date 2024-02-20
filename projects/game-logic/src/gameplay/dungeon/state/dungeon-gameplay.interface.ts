import { IEntity } from "../../../lib/base/entity/entity.interface";
import { Guid } from "../../../lib/extensions/types";
import { IActor } from "../../../lib/modules/actor/actor.interface";
import { IAassignedBoardObject, IBoardField } from "../../../lib/modules/board/board.interface";
import { ITurnBasedGameplayState, ITurnBasedGameplayPlayers } from "../../../lib/modules/playstyle/turn-based/turn-based-gameplay.interface";
import { IGameplaySharedState, IGameplaySharedDataFeed } from "../../shared/gameplay-shared.interface";
import { IDungeonDataFeed } from "../dungeons.interface";


export type IDungeonGameplayState =
  { id: Guid } &
  IGameplaySharedState &
  ITurnBasedGameplayState &
  { entities: Array<Partial<IAassignedBoardObject & IBoardField>> };


export type IDungeonGameplayPayload =
  { dungeonId: Guid; } &
  ITurnBasedGameplayPlayers &
  { entities: Array<Partial<IAassignedBoardObject & IBoardField & IActor> & IEntity> };

  // dungeonId: string,
  // players: (IPlayer & { heroes: IHero[] })[]


export type IDungeonGameplayFeed =
  IGameplaySharedDataFeed &
  IDungeonDataFeed;