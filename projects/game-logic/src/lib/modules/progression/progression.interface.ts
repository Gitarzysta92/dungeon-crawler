import { IActionDeclaration } from "../../cross-cutting/action/action.interface";

export interface IPromotionDefinition {
  level: number;
  requiredExperience: number;
  actions: IActionDeclaration<unknown>[]
}