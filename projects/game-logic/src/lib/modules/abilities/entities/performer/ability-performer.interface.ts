import { IEntity } from "../../../../base/entity/entity.interface";
import { Guid } from "../../../../extensions/types";
import { IAbility, IAbilityDeclaration } from "../ability/ability.interface";

export interface IAbilityPerformer extends IEntity {
  id: Guid;
  abilities: IAbility[];
  isAbilityPerformer: true;
  hasAbility(a: IAbility | Guid): boolean;
  isAbleToUseAbility(a: IAbility | Guid): boolean;
  addAbility(a: IAbility): void;
  removeAbility(a: IAbility): void
}

export interface IAbilityPerformerDeclaration extends IEntity {
  id: Guid;
  abilities: IAbilityDeclaration[];
  isAbilityPerformer: true;
}
