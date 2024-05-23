
import { IGatherableData } from "../../../cross-cutting/gatherer/data-gatherer.interface";
import { IModifierDeclaration } from "../../../cross-cutting/modifier/modifier.interface";
import { IDelegateDeclaration } from "../../../infrastructure/delegate/delegate.interface";
import { ResolvableReference } from "../../../infrastructure/extensions/types";
import { CastingStepType } from "../entities/effect.constants";
import { IEffectDeclaration } from "../entities/effect.interface";


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
  payload: any;
  exposer?: any;
  statusId?: any;
} & IDelegateDeclaration & ICastingStepBase;


export type IExposeModifierCastingStep = {
  stepType: CastingStepType.CastingEffect
  exposer: ResolvableReference<unknown>;
} & IModifierDeclaration<unknown> & ICastingStepBase;export type ICastingStepBase = {
  predecessorRef?: ResolvableReference<ICastingStepBase>;
  order?: number;
};
export type IEffectCastingSchema = {
  [key: string]: ICastingStep;
};

