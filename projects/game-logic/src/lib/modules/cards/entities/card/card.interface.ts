import { IActivitySubject, IActivitySubjectDeclaration } from "../../../../base/activity/activity.interface";
import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IModificableDeclaration } from "../../../../cross-cutting/modifier/modifier.interface";
import { IDeck } from "../deck/deck.interface";

export interface ICard extends Omit<ICardDeclaration, 'activities'>, IActivitySubject {
  deck: IDeck
}

export interface ICardDeclaration extends
  IEntityDeclaration,
  IModificableDeclaration,
  IActivitySubjectDeclaration {
  isCard: true
  maxCopies?: number;
  quantity?: number;
}