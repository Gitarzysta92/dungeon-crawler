import { IAreasDataFeed } from "../../../lib/modules/areas/areas.interface";
import { IContinuousGameplayState } from "../../../lib/modules/continuous-gameplay/continuous-gameplay.interface";
import { IAdventureDataFeed } from "../../modules/adventure/adventure.interface";
import { IDungeonDataFeed } from "../../modules/dungeon/dungeon.interface";
import { IEntityDeclaration } from "../../../lib/base/entity/entity.interface";
import { IAbilitiesDataFeed } from "../../../lib/modules/abilities/abilities.interface";
import { IActorDataFeed } from "../../../lib/modules/actors/actors.interface";
import { ICardsDeckDataFeed } from "../../../lib/modules/cards-deck/cards-deck.interface";
import { IItemsDataFeed } from "../../../lib/modules/items/items.interface";
import { IQuestDataFeed } from "../../../lib/modules/quest/quest.interface";
import { Guid } from "../../../lib/extensions/types";
import { IStatisticDataFeed } from "../../../lib/modules/statistics/statistics.interface";


export type IAdventureGameplayStateDto =
  { id: Guid } &
  IContinuousGameplayState &
  { entities: IEntityDeclaration[] }

export type IAdventureGameplayDataGatherer = any;


export type IAdventureGameplayFeed =
  IAdventureDataFeed &
  IAreasDataFeed &
  IDungeonDataFeed &
  IQuestDataFeed &
  IActorDataFeed &
  IItemsDataFeed &
  IAbilitiesDataFeed &
  ICardsDeckDataFeed &
  IStatisticDataFeed;
