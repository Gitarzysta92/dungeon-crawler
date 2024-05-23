
import { IEntityDeclaration } from "../../../base/entity/entity.interface";
import { IEvent } from "../../../cross-cutting/event/event.interface";
import { IGatheringHandler } from "../../../cross-cutting/gatherer/data-gatherer.interface";
import { DataGatheringTask } from "../../../cross-cutting/gatherer/data-gathering-task";
import { IClonable } from "../../../infrastructure/extensions/interfaces";
import { Guid } from "../../../infrastructure/extensions/types";
import { CastEffectCastingStep } from "../casting-steps/cast-effect.step";
import { IEffectCastingSchema } from "../casting-steps/casting-step.interface";
import { MakeActionCastingStep } from "../casting-steps/make-action.step";
import { EffectCastTime, EffectLifetime } from "./effect.constants";


export interface IEffectCaster {
  id: Guid;
  groupId: Guid;
  gatherers: IGatheringHandler<unknown>[]
}

export interface IEffect extends IEffectDeclaration, IClonable<IEffect> {
  castTimestamp: number;
  caster: IEffectCaster;
  resolve(): Array<CastEffectCastingStep | MakeActionCastingStep>;
  initializeCastingProcess(caster: IEffectCaster): DataGatheringTask;
}

export interface IEffectDeclaration extends IEntityDeclaration {
  castTime: EffectCastTime;
  lifetime: EffectLifetime;
  duration?: number;
  castTriggers?: IEvent<unknown>[];
  castingSchema: IEffectCastingSchema;
  isEffect: true;
}
