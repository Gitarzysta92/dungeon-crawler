import { IEffectDeclaration } from "../entities/effect.interface";
import { IDelegateDeclaration } from "../../../base/delegate/delegate.interface";
import { IGatherableData } from "../../../cross-cutting/gatherer/data-gatherer.interface";
import { IModifierDeclaration } from "../../../cross-cutting/modifier/modifier.interface";
import { CastingStepType } from "../entities/effect.constants";
import { ResolvableReference } from "../../../extensions/types";


export type ICastingStep =
  IGatheringDataCastingStep |
  ICastEffectCastingsStep |
  IMakeActionCastingStep |
  IExposeModifierCastingStep;


export interface IGatheringDataCastingStep extends ICastingStepBase, IGatherableData {
  stepType: CastingStepType.GatheringData;
  payload?: ResolvableReference<number>;
}
;


export interface ICastEffectCastingsStep extends ICastingStepBase {
  stepType: CastingStepType.CastingEffect;
  repetitions?: ResolvableReference<number>;
  effectRef: ResolvableReference<IEffectDeclaration>;
}



export type IMakeActionCastingStep = {
  stepType: CastingStepType.MakeAction;
} & IDelegateDeclaration<unknown> & ICastingStepBase;


export type IExposeModifierCastingStep = {
  stepType: CastingStepType.ApplyStatus;
  exposer: ResolvableReference<unknown>;
} & IModifierDeclaration<unknown> & ICastingStepBase;export type ICastingStepBase = {
  predecessorRef?: ResolvableReference<ICastingStepBase>;
  order?: number;
};
export type IEffectCastingSchema = {
  [key: string]: ICastingStep;
};

