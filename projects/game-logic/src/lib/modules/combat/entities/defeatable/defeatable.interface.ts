import { IEntity } from "../../../../base/entity/entity.interface";
import { IConditionDeclaration } from "../../../../cross-cutting/condition/condition.interface";

export interface IDefeater extends IEntity {

}

export interface IDefeatable extends IDefeatableDeclaration, IEntity {
  isDefeated(): boolean;
  defeater: IDefeater
}

export interface IDefeatableDeclaration {
  defeatConditions: IConditionDeclaration<unknown>[]
  isDefeatable: boolean;
}

