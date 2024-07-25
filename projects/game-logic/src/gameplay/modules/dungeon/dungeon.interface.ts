import { IEntity, IEntityDeclaration } from "../../../lib/base/entity/entity.interface";
import { Guid } from "../../../lib/infrastructure/extensions/types";
import { IAbilitiesDataFeed } from "../../../lib/modules/abilities/abilities.interface";
import { IActorDataFeed } from "../../../lib/modules/actors/actors.interface";
import { IActor, IActorDeclaration } from "../../../lib/modules/actors/entities/actor/actor.interface";
import { IBoardAssignment } from "../../../lib/modules/board/entities/board-object/board-object.interface";
import { ICardsDeckDataFeed } from "../../../lib/modules/cards/cards.interface";
import { IItemsDataFeed } from "../../../lib/modules/items/items.interface";
import { IQuestDataFeed } from "../../../lib/modules/quest/quest.interface";
import { IStatisticDataFeed } from "../../../lib/modules/statistics/statistics.interface";
import { ITurnGameplayPlayer } from "../../../lib/modules/turn-based-gameplay/mixins/turn-based-player/turn-based-player.interface";
import { ITurnBasedGameplayDeclaration } from "../../../lib/modules/turn-based-gameplay/turn-based-gameplay.interface";


export interface IDungeonGameplayDeclaration extends ITurnBasedGameplayDeclaration {
  id: Guid;
  isDungeonGameplay: true;
  spawnPoints: IBoardAssignment[];
  entities: IDungeonGameplayEntityDeclaration[];
}

export type IDungeonGameplayEntityDeclaration =
  IEntityDeclaration &
  Partial<IActorDeclaration> & 
  Partial<IBoardAssignment>


export type IDungeonGameplayEntity =
  IEntity &
  Partial<IActor> &
  Partial<IBoardAssignment>


export interface IDungeonGameplayTurnResult {
  player: ITurnGameplayPlayer;
  isFinished: boolean;
  winners: ITurnGameplayPlayer[];
}

export interface IDungeonDataFeed {
  getDungeonTemplates: (ids?: Guid[]) => Promise<IDungeonGameplayDeclaration[]>;
  getDungeonTemplate: (id: Guid) => Promise<IDungeonGameplayDeclaration>;
}

export type IDungeonGameplayFeed =
  IDungeonDataFeed &
  IQuestDataFeed &
  IActorDataFeed &
  IItemsDataFeed &
  IAbilitiesDataFeed &
  ICardsDeckDataFeed &
  IStatisticDataFeed;