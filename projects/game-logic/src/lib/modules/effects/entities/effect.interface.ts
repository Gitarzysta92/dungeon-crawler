import { IEntity } from "../../../base/entity/entity.interface";
import { IEvent } from "../../../cross-cutting/event/event.interface";
import { IClonable } from "../../../extensions/interfaces";
import { Guid } from "../../../extensions/types";
import { CastEffectCastingStep } from "../casting-steps/cast-effect.step";
import { IEffectCastingSchema } from "../casting-steps/casting-step.interface";
import { MakeActionCastingStep } from "../casting-steps/make-action.step";
import { EffectCastTime, EffectLifetime } from "./effect.constants";


export interface IEffectCaster {
  id: Guid;
  groupId: Guid;
}

export interface IEffect extends IEffectDeclaration, IClonable {
  castTimestamp: number;
  caster: IEffectCaster;
  resolve(): Array<CastEffectCastingStep | MakeActionCastingStep> 
}

export interface IEffectDeclaration extends IEntity {
  castTime: EffectCastTime;
  lifetime: EffectLifetime;
  duration?: number;
  castTriggers?: IEvent<unknown>[];
  castingSchema: IEffectCastingSchema;
  isEffect: true;
}
