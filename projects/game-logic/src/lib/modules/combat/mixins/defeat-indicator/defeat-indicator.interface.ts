import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";

export interface IDefeatIndicator extends Omit<IDefeatIndicatorDeclaration, 'entities'>, IEntity {
  
}


export interface IDefeatIndicatorDeclaration extends IEntityDeclaration {
  value?: number;
  defeatTreshold: number;
  isDefeatIndicator: boolean;
}