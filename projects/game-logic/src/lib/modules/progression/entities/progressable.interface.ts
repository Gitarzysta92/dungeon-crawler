
import { IEntityDeclaration } from "../../../base/entity/entity.interface";
import { IPromotionDefinition } from "../progression.interface";

export interface IProgressable extends IProgressableDeclaration {
  gainExperience(n: number): void;
  promote(): void;
}

export interface IProgressableDeclaration extends IEntityDeclaration {
  isProgressable: true;
  level: number;
  experiencePoints: number;
  promotions: IPromotionDefinition[];
}