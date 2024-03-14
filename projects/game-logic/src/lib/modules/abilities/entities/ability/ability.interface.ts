import { IEntity } from "../../../../base/entity/entity.interface";
import { IModificable } from "../../../../cross-cutting/modifier/modifier.interface";
import { Guid } from "../../../../extensions/types";
import { IAbilityPerformer } from "../performer/ability-performer.interface";


export interface IAbility extends IEntity {
  id: Guid;
  abilityParameters: { [key: string]: number; };
  isAbility: true;
  abilityPerformer: IAbilityPerformer;
}

export interface IAbilityDeclaration extends IEntity, Partial<IModificable> {
  id: Guid;
  abilityParameters: { [key: string]: number; };
  isAbility: true;
}
