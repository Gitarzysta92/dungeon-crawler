import { IClonable } from "../../extensions/interfaces";
import { Guid } from "../../extensions/types";
import { IMixin } from "../mixin/mixin.interface";


export interface IEntity extends IEntityDeclaration, IClonable {
  onInitialize(): void;
  onDestroy(): void;
}


export interface IEntityDeclaration extends IMixin {
  id: Guid;
  tags?: string[];
  toRemove?: boolean;
  isEntity: true;
}