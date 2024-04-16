import { Constructor } from "../../extensions/types";

export interface IMixin {
  isMixin: true
}

export interface IMixinFactory<T> {
  create?(c: Constructor, e: T): Constructor;
  createAsync?(c: Constructor, e: T): Promise<Constructor>;
  validate?(e: T): boolean;
  validateAsync?(e: T): Promise<boolean>;
}
