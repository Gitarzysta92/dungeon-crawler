import { IAreasDataFeed } from "../../../lib/modules/areas/areas.interface";
import { IContinuousGameplayState } from "../../../lib/modules/continuous-gameplay/continuous-gameplay.interface";
import { IAdventureGameplayDataFeed } from "../../modules/adventure/adventure.interface";
import { IDungeonDataFeed } from "../../modules/dungeon/dungeon.interface";
import { IEntity } from "../../../lib/base/entity/entity.interface";
import { IAbilitiesDataFeed } from "../../../lib/modules/abilities/abilities.interface";
import { IActorDataFeed } from "../../../lib/modules/actors/actors.interface";
import { ICardsDeckDataFeed } from "../../../lib/modules/cards-deck/cards-deck.interface";
import { IItemsDataFeed } from "../../../lib/modules/items/items.interface";
import { IQuestDataFeed } from "../../../lib/modules/quest/quest.interface";
import { Guid } from "../../../lib/extensions/types";


export type IAdventureGameplayStateDto =
  { id: Guid } &
  IContinuousGameplayState &
  { entities: IEntity[] }

export type IAdventureGameplayDataGatherer = any;


export type IAdventureGameplayFeed =
  IAdventureGameplayDataFeed &
  IAreasDataFeed &
  IDungeonDataFeed &
  IQuestDataFeed &
  IActorDataFeed &
  IItemsDataFeed &
  IAbilitiesDataFeed &
  ICardsDeckDataFeed;
