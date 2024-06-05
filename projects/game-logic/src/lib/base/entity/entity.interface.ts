import { IClonable } from "../../infrastructure/extensions/interfaces";
import { Guid } from "../../infrastructure/extensions/types";
import { IMixin } from "../../infrastructure/mixin/mixin.interface";



export interface IEntity extends IEntityDeclaration, IClonable {
  onInitialize(): void;
  onDestroy(): void;
  isAdjanced(e: IEntity): boolean;
}


export interface IEntityDeclaration extends IMixin {
  id: Guid;
  tags?: string[];
  toRemove?: boolean;
  isEntity: true;
}