import { Guid } from "../../../lib/extensions/types";
import { IAbilitiesDataFeed } from "../../../lib/modules/abilities/abilities.interface";
import { IActorDataFeed } from "../../../lib/modules/actors/actors.interface";
import { ITraveler } from "../../../lib/modules/areas/entities/traveler/traveler.interface";
import { ICardsDeckDataFeed } from "../../../lib/modules/cards-deck/cards-deck.interface";
import { IItemsDataFeed } from "../../../lib/modules/items/items.interface";
import { IQuestDataFeed } from "../../../lib/modules/quest/quest.interface";
import { IStatisticDataFeed } from "../../../lib/modules/statistics/statistics.interface";
import { IDungeonAreaDeclaration } from "./mixins/dungeon-area/dungeon-area.interface";

export interface IDungeonDataFeed {
  getDungeonTemplates: (ids?: Guid[]) => Promise<IDungeonAreaDeclaration[]>;
  getDungeonTemplate: (id: Guid) => Promise<IDungeonAreaDeclaration>;
}

export interface IDungeonCrawler extends ITraveler {
  id: Guid;
  visitedDungeonId: Guid;
}
export type IDungeonGameplayFeed =
  IDungeonDataFeed &
  IQuestDataFeed &
  IActorDataFeed &
  IItemsDataFeed &
  IAbilitiesDataFeed &
  ICardsDeckDataFeed &
  IStatisticDataFeed;
