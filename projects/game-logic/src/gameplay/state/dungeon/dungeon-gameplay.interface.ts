import { IEntityDeclaration } from "../../../lib/base/entity/entity.interface";
import { Guid } from "../../../lib/extensions/types";
import { IAbilitiesDataFeed } from "../../../lib/modules/abilities/abilities.interface";
import { IActorDataFeed } from "../../../lib/modules/actors/actors.interface";
import { ICardsDeckDataFeed } from "../../../lib/modules/cards-deck/cards-deck.interface";
import { IItemsDataFeed } from "../../../lib/modules/items/items.interface";
import { IQuestDataFeed } from "../../../lib/modules/quest/quest.interface";
import { ITurnBasedGameplayState } from "../../../lib/modules/turn-based-gameplay/turn-based-gameplay.interface";
import { IDungeonDataFeed } from "../../modules/dungeon/dungeon.interface";


export type IDungeonGameplayStateDto =
  { id: Guid } &
  ITurnBasedGameplayState &
  { entities: Array<IEntityDeclaration> };

  export type IDungeonGameplayDataGatherer = any;

export type IDungeonGameplayFeed =
  IDungeonDataFeed &
  IQuestDataFeed &
  IActorDataFeed &
  IItemsDataFeed &
  IAbilitiesDataFeed &
  ICardsDeckDataFeed;