import { IEntity, IEntityDeclaration } from "../../../lib/base/entity/entity.interface";
import { Guid } from "../../../lib/infrastructure/extensions/types";
import { IAbilitiesDataFeed } from "../../../lib/modules/abilities/abilities.interface";
import { IActorDataFeed } from "../../../lib/modules/actors/actors.interface";
import { IActor, IActorDeclaration } from "../../../lib/modules/actors/entities/actor/actor.interface";
import { IBoardAssignment } from "../../../lib/modules/board/entities/board-object/board-object.interface";
import { ICardsDeckDataFeed } from "../../../lib/modules/cards/cards.interface";
import { IDeckBearer } from "../../../lib/modules/cards/entities/deck-bearer/deck-bearer.interface";
import { IDefeatable } from "../../../lib/modules/combat/entities/defeatable/defeatable.interface";
import { IItemsDataFeed } from "../../../lib/modules/items/items.interface";
import { IQuestDataFeed } from "../../../lib/modules/quest/quest.interface";
import { IStatisticDataFeed } from "../../../lib/modules/statistics/statistics.interface";
import { ITurnBasedGameplayConfiguration, ITurnBasedGameplayDeclaration, ITurnBasedGameplayState } from "../../../lib/modules/turn-based-gameplay/turn-based-gameplay.interface";


export interface IDungeonGameplayConfiguration extends ITurnBasedGameplayConfiguration { }

export interface IDungeonGameplayState extends ITurnBasedGameplayState {
  id: Guid;
  isDungeonGameplay: true;
  spawnPoints: IBoardAssignment[];
  entities: IDungeonGameplayEntityDeclaration[];
}

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
  Partial<IBoardAssignment> &
  Partial<IDeckBearer> &
  Partial<IDefeatable>


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