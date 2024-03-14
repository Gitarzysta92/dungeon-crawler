import { IEntity } from "../../../lib/base/entity/entity.interface";
import { Guid } from "../../../lib/extensions/types";
import { IActor } from "../../../lib/modules/actors/entities/actor/actor.interface";
import { IAassignedBoardObject } from "../../../lib/modules/board/entities/board-object/board-object.interface";
import { IBoardField } from "../../../lib/modules/board/entities/board-field/board-field.interface";
import { ITurnBasedGameplayPlayers, ITurnBasedGameplayState } from "../../../lib/modules/turn-based-gameplay/turn-based-gameplay.interface";
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