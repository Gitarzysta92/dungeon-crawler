import { ITriggerDefinition } from "../../cross-cutting/trigger/trigger.interface";
import { Guid } from "../../extensions/types";
import { IEffectCastingSchema } from "./casting-steps/casting-step.interface";
import { EffectCastTime, EffectLifetime } from "./effect.constants";


export interface IEffectCaster {
  id: Guid;
  groupId: Guid;
}

export interface IEffect extends IEffectDefinition {
  castTimestamp: number;
}

export interface IEffectDefinition {
  castTime: EffectCastTime;
  lifetime: EffectLifetime;
  duration?: number;
  castTriggers?: ITriggerDefinition[];
  castingSchema: IEffectCastingSchema;
  isEffect: true;
}
