import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { Guid, ResolvableReference } from "../../../../infrastructure/extensions/types";
import { IDefeatIndicator } from "../../mixins/defeat-indicator/defeat-indicator.interface";

export interface IDefeater extends IEntityDeclaration {
  id: Guid;
}

export interface IDefeatable extends IDefeatableDeclaration {
  isDefeated: boolean;
  defeater: IDefeater;
  defeaterId?: Guid;
  defeatIndicators: IDefeatIndicator[];
} 


export interface IDefeatableDeclaration {
  isDefeatable: true;
  //defeatIndicatorsRef: ResolvableReference<IDefeatIndicator>[]
}


