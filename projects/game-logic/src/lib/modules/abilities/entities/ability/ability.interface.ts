import { IActivitySubject, IActivitySubjectDeclaration } from "../../../../base/activity/activity.interface";
import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IModificableDeclaration } from "../../../../cross-cutting/modifier/modifier.interface";
import { Guid } from "../../../../infrastructure/extensions/types";
import { IAbilityPerformer } from "../performer/ability-performer.interface";


export interface IAbility extends Omit<IAbilityDeclaration, 'activities' | 'entities'>, IActivitySubject, IEntity {
  id: Guid;
  parameters: { [key: string]: IAbilityParameter; };
  isAbility: true;
  abilityPerformer: WeakRef<IAbilityPerformer>
}

export interface IAbilityDeclaration extends
  IEntityDeclaration,
  IModificableDeclaration,
  IActivitySubjectDeclaration {
  id: Guid;
  isAbility: true;
}

export interface IAbilityParameter extends IModificableDeclaration {
  value: number;
}
