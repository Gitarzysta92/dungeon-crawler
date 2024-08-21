import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { Guid } from "../../../../infrastructure/extensions/types";
import { IAffectableDeclaration } from "../affectable/affectable.interface";
import { IStatus, IStatusDeclaration } from "../status/status.interface";

export interface IStatusExposer extends Omit<IStatusExposerDeclaration, "entities">, IEntity {
  getApplicableStatuses(affectable: IAffectableDeclaration): IStatus[]
}



export interface IStatusExposerDeclaration extends IEntityDeclaration{
  id: Guid;
  isStatusExposer: true;
  statuses: IStatusDeclaration[]
};
