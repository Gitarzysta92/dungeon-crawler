import { IActivityDoer } from "../../../../base/activity/activity.interface";
import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { Guid } from "../../../../infrastructure/extensions/types";
import { IAbility, IAbilityDeclaration } from "../ability/ability.interface";

export interface IAbilityPerformer extends IEntityDeclaration, IActivityDoer {
  id: Guid;
  abilities: IAbility[];
  isAbilityPerformer: true;
  hasAbility(a: IAbility | Guid): boolean;
  isAbleToUseAbility(a: IAbility | Guid): boolean;
  addAbility(a: IAbility): void;
  removeAbility(a: IAbility): void
}

export interface IAbilityPerformerDeclaration extends IEntityDeclaration {
  id: Guid;
  abilities: IAbilityDeclaration[];
  isAbilityPerformer: true;
}
