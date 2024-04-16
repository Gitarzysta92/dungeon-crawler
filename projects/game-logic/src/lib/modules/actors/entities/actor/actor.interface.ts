import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { Guid } from "../../../../extensions/types";


export interface IActor extends IActorDeclaration {
  
}

export interface IActorDeclaration extends IEntityDeclaration {
  groupId?: Guid;
  sourceActorId?: string;
  isActor: true;
}
