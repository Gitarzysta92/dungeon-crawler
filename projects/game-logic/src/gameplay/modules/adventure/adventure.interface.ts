import { IAbilitiesDataFeed } from "../../../lib/modules/abilities/abilities.interface";
import { IActorDataFeed } from "../../../lib/modules/actors/actors.interface";
import { IAreasDataFeed } from "../../../lib/modules/areas/areas.interface";
import { ICardsDeckDataFeed } from "../../../lib/modules/cards/cards.interface";
import { IItemsDataFeed } from "../../../lib/modules/items/items.interface";
import { IQuestDataFeed } from "../../../lib/modules/quest/quest.interface";
import { IStatisticDataFeed } from "../../../lib/modules/statistics/statistics.interface";
import { IDungeonDataFeed } from "../dungeon/dungeon.interface";
import { IAdventureMapDeclaration } from "./mixins/adventure-map/adventure-map.interface";



export type IAdventureDataFeed =
{
  getAdventureMap: () => Promise<IAdventureMapDeclaration>;
} &
  IAreasDataFeed &
  IDungeonDataFeed &
  IQuestDataFeed &
  IActorDataFeed &
  IItemsDataFeed &
  IAbilitiesDataFeed &
  ICardsDeckDataFeed &
  IStatisticDataFeed;
