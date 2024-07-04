import { IActivitySubjectDeclaration } from "../../../../base/activity/activity.interface";
import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IModificableDeclaration } from "../../../../cross-cutting/modifier/modifier.interface";

export interface ICard extends ICardDeclaration {
 
}

export interface ICardDeclaration extends
  IEntityDeclaration,
  IModificableDeclaration,
  IActivitySubjectDeclaration {
  isCard: true
  maxCopies?: number;
  quantity?: number;
}