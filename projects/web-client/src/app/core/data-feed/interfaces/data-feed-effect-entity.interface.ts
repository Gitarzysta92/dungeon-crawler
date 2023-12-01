import { IEffect } from "@game-logic/lib/features/effects/resolve-effect.interface";
import { IDataFeedEntityBase } from "./data-feed-entity.interface";

export type ISpellOrAbilityDataFeedEntity = IEffect & IEffectDataFeedEntity;

export interface IEffectDataFeedEntity extends IDataFeedEntityBase {
  //entityType: DataFeedEntityType.Effect,
  informative: { name: string, description: string },
  visualUi: {
    icon: string;
  }
}