import { IEntity } from "../../base/entity/entity.interface";
import { Guid } from "../../extensions/types";
import { IAbilityPerformer } from "./performer/ability-performer.interface";

export interface IAbility extends IEntity {
  id: Guid;
  abilityParameters: { [key: string]: number }
  isAbility: true;
  abilityPerformer?: IAbilityPerformer
}

export interface IAbilityDataFeed {
  getAbilities: (ids?: Guid[]) => Promise<IAbility[]>;
  getAbility: (id: Guid) => Promise<IAbility>;
}