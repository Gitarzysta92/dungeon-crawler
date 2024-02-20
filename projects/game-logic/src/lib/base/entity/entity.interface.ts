import { Constructor, Guid } from "../../extensions/types";
import { EntityLifecycle } from "./entity.constants";

export interface IEntity {
  id: Guid;
  lifecycle: EntityLifecycle;
  //tags?: string[];
  wasUsed?: boolean;
  toRemove?: boolean;
  isEntity: true;
}

export interface IEntityFactory<T> {

  get classDefinition(): Constructor;
  create?: (e: IEntity) => T;
  validate?: (e: IEntity) => boolean;
  createAsync?: (e: IEntity) => Promise<T>;
  validateAsync?: (e: IEntity) => Promise<boolean>
}