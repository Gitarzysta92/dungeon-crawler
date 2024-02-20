import { IInteractionSubject } from "../../cross-cutting/interaction/interaction.interface";
import { Guid } from "../../extensions/types";

export interface IUnlockable {
  isUnlocked: boolean;
  unlockingConditions?: unknown[];
  isUnlockable: true;
}

export interface IImprovable extends IInteractionSubject {
  isImproveable: true;
  improvementActions: unknown[]
}

export interface IProgressable {
  id: Guid;
  isProgressable: true;
  level: number;
  experiencePoints: number;
  promotions: IPromotion[];
}

export interface IPromotion {
  condition: any[]
}