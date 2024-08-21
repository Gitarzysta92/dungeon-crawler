import { IActivitySubject, IActivitySubjectDeclaration } from "../../../../base/activity/activity.interface";
import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IModificableDeclaration } from "../../../../cross-cutting/modifier/modifier.interface";
import { IDeckBearer } from "../deck-bearer/deck-bearer.interface";
import { IDeck } from "../deck/deck.interface";

export interface ICard extends Omit<ICardDeclaration, 'activities' | 'entities'>, IActivitySubject, IEntity {
  bearer: IDeckBearer;
}

export interface ICardDeclaration extends
  IEntityDeclaration,
  IModificableDeclaration,
  IActivitySubjectDeclaration {
  isCard: true
  maxCopies?: number;
  quantity?: number;
}