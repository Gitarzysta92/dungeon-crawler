import { IDataFeedEntityBase } from "./data-feed-entity.interface";
import { IHeroTemplate } from "@game-logic/lib/game/hero-template.interface";

export interface IHeroDataFeedEntity extends IDataFeedEntityBase, IHeroTemplate {
 //entityType: DataFeedEntityType.Hero,
  informative: { name: string, description: string },
  visualUi: {
    avatar: { url: string }
  }
}