import { IDungeonCard } from "@game-logic/lib/features/dungeon/dungeon-deck.interface";
import { IDataFeedEntityBase } from "./data-feed-entity.interface";
import { IEffect } from "@game-logic/lib/features/effects/effects-commons.interface";

export interface IDungeonCardDataFeedEntity extends IDataFeedEntityBase, IDungeonCard<IEffect> {
  //entityType: DataFeedEntityType.DungeonCard,
  informative: { name: string, description: string }
}