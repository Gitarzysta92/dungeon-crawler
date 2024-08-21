import { IClonable } from "../../infrastructure/extensions/interfaces";
import { Guid } from "../../infrastructure/extensions/types";
import { IMixin } from "../../infrastructure/mixin/mixin.interface";



export interface IEntity extends IEntityDeclaration, IClonable {
  entities: IEntity[]
  onInitialize(): void;
  onUpdate?(): void;
  onDestroy(): void;
  getEntity<T>(d: (e: IEntity & T) => boolean): (IEntity & T)
  getEntities<T>(d: (e: IEntity & T) => boolean): (IEntity & T)[];
  registerEntity(e: IEntity): void;
  unregisterEntity(e: IEntity): void;
  createEntity<T extends IEntity = IEntity>(e: IEntityDeclaration): T
  isLocked(): boolean;
}


export interface IEntityDeclaration extends IMixin {
  id: Guid;
  entities?: IEntityDeclaration[]
  tags?: Array<number | string>;
  toRemove?: boolean;
  isEntity: true;
}