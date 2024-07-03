import { IEntityDeclaration } from "../../../lib/base/entity/entity.interface";
import { Guid } from "../../../lib/infrastructure/extensions/types";
import { IMixin } from "../../../lib/infrastructure/mixin/mixin.interface";
import { IAbilitiesDataFeed } from "../../../lib/modules/abilities/abilities.interface";
import { IActorDataFeed } from "../../../lib/modules/actors/actors.interface";
import { IBoardAssignment } from "../../../lib/modules/board/entities/board-object/board-object.interface";
import { ICardsDeckDataFeed } from "../../../lib/modules/cards-deck/cards-deck.interface";
import { IItemsDataFeed } from "../../../lib/modules/items/items.interface";
import { IQuestDataFeed } from "../../../lib/modules/quest/quest.interface";
import { IStatisticDataFeed } from "../../../lib/modules/statistics/statistics.interface";

export interface IDungeonDataFeed {
  getDungeonTemplates: (ids?: Guid[]) => Promise<IDungeonTemplate[]>;
  getDungeonTemplate: (id: Guid) => Promise<IDungeonTemplate>;
}

export type IDungeonGameplayFeed =
  IDungeonDataFeed &
  IQuestDataFeed &
  IActorDataFeed &
  IItemsDataFeed &
  IAbilitiesDataFeed &
  ICardsDeckDataFeed &
  IStatisticDataFeed;


export interface IDungeonTemplate extends IMixin {
  id: Guid;
  isDungeonMap: true;
  //spawnPoints: IBoardAssignment[];
  entities: (IEntityDeclaration & { id?: Guid; sourceActorId?: Guid; groupId?: Guid; } & Partial<IBoardAssignment>)[];
}
