import { IEntity } from "../../lib/base/entity/entity.interface";
import { IAbilityDataFeed } from "../../lib/modules/ability/ability.interface";
import { IAbilityPerformer } from "../../lib/modules/ability/performer/ability-performer.interface";
import { IActorDataFeed } from "../../lib/modules/actor/actor.interface";
import { ICardsDeckDataFeed } from "../../lib/modules/cards-deck/cards-deck.interface";
import { IInventoryBearer } from "../../lib/modules/item/bearer/inventory-bearer.interface";
import { IItemDataFeed } from "../../lib/modules/item/item.interface";
import { IProgressable } from "../../lib/modules/progression/progression.interface";
import { IQuestCompleter, IQuestDataFeed } from "../../lib/modules/quest/quest.interface";

export type IGameplaySharedState =
  { entities: Array<IEntity & Partial<IInventoryBearer & IAbilityPerformer & IProgressable & IQuestCompleter>> }

export type IGameplaySharedDataFeed =
  IQuestDataFeed &
  IActorDataFeed &
  IItemDataFeed &
  IAbilityDataFeed &
  ICardsDeckDataFeed;