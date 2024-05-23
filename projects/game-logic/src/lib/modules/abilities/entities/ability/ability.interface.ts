import { IActivitySubjectDeclaration } from "../../../../base/activity/activity.interface";
import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IModificable } from "../../../../cross-cutting/modifier/modifier.interface";
import { Guid } from "../../../../infrastructure/extensions/types";
import { IAbilityPerformer } from "../performer/ability-performer.interface";


export interface IAbility extends IAbilityDeclaration {
  id: Guid;
  abilityParameters: { [key: string]: IAbilityParameter; };
  isAbility: true;
  
  abilityPerformer: WeakRef<IAbilityPerformer>
}

export interface IAbilityDeclaration extends IEntityDeclaration, Partial<IModificable>, IActivitySubjectDeclaration {
  id: Guid;
  abilityParameters: { [key: string]: IAbilityParameter; };
  isAbility: true;
}

export interface IAbilityParameter extends IModificable {
  value: number;
}
