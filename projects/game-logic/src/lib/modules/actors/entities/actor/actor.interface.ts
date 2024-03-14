import { IEntity } from "../../../../base/entity/entity.interface";
import { Guid } from "../../../../extensions/types";


export interface IActor extends IActorDeclaration {
  
}

export interface IActorDeclaration extends IEntity {
  groupId?: Guid;
  controllable?: boolean;
  sourceActorId?: string;
  isActor: true;
}
