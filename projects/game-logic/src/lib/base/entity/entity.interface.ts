import { Constructor, Guid } from "../../extensions/types";

export interface IEntity {
  id: Guid;
  tags?: string[];
  toRemove?: boolean;
  isEntity: true;
}

export interface IEntityFactory<T> {
  create?: (c: Constructor, e: IEntity) => Constructor;
  createAsync?: (c: Constructor, e: IEntity) => Promise<Constructor>;
  validate?: (e: IEntity) => boolean;
  validateAsync?: (e: IEntity) => Promise<boolean>
}