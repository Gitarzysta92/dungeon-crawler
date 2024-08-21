import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { Guid } from "../../../../infrastructure/extensions/types";
import { IStatusInstance } from "../status-instance/status-instance.interface";


export interface IAffectable extends Omit<IAffectableDeclaration, 'entities'>, IEntity {
  applyStatus(s: IStatusInstance): void
}

export interface IAffectableDeclaration extends IEntityDeclaration {
  id: Guid;
  isAffectable: true;
};
