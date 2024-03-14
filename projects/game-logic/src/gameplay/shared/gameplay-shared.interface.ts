import { IEntity } from "../../lib/base/entity/entity.interface";
import { IAbilitiesDataFeed } from "../../lib/modules/abilities/abilities.interface";
import { IAbilityPerformer } from "../../lib/modules/abilities/entities/performer/ability-performer.interface";
import { IActorDataFeed } from "../../lib/modules/actors/actors.interface";
import { ICardsDeckDataFeed } from "../../lib/modules/cards-deck/cards-deck.interface";
import { IInventoryBearer } from "../../lib/modules/items/entities/bearer/inventory-bearer.interface";
import { IItemsDataFeed } from "../../lib/modules/items/items.interface";
import { IProgressable } from "../../lib/modules/progression/entities/progressable.interface";
import { IQuestDataFeed } from "../../lib/modules/quest/quest.interface";
import { IQuestResolver } from "../../lib/modules/quest/entities/quest-resolver/quest-resolver.interface";

export type IGameplaySharedState =
  { entities: Array<IEntity & Partial<IInventoryBearer & IAbilityPerformer & IProgressable & IQuestResolver>> }

export type IGameplaySharedDataFeed =
  IQuestDataFeed &
  IActorDataFeed &
  IItemsDataFeed &
  IAbilitiesDataFeed &
  ICardsDeckDataFeed;