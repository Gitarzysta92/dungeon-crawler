import { IActor } from "../actors/actors.interface";
import { IBoardSelectorOrigin, IField } from "../board/board.interface";
import { GatheringStepDataName } from "./effect-payload-collector.constants";
import { IActorCollectableData, ICollectedDataStep, IEffectCollectableData, IFieldCollectableData, IOriginCollectableData, IRotationCollectableData, ISourceActorCollectableData } from "./effect-payload.interface";
import { IEffect } from "./resolve-effect.interface";

export class OriginCollectableData implements IOriginCollectableData {
  dataName: GatheringStepDataName.Origin = GatheringStepDataName.Origin;
  possibleOriginsResolver?: ((prev: ICollectedDataStep[]) => IBoardSelectorOrigin[]) | undefined;
  possibleOrigins?: IBoardSelectorOrigin[] | undefined;
  payload?: IBoardSelectorOrigin | undefined;
  effectId?: string | undefined;
  requireUniqueness: boolean = false;
  autoCollect?: boolean | undefined;
  incorporatePayloadDefinitionForSelectedEffect?: boolean | undefined;

  constructor(data: Omit<IOriginCollectableData, 'dataName'|'effectId'>) {
    Object.assign(this, data);
  }
}


export class ActorCollectableData implements IActorCollectableData {
  dataName: GatheringStepDataName.Actor = GatheringStepDataName.Actor;
  possibleActorsResolver?: ((prev: ICollectedDataStep[]) => IActor[]) | undefined;
  possibleActors?: IActor[] | undefined;
  payload?: IActor | undefined;
  effectId?: string | undefined;
  requireUniqueness: boolean = false;
  autoCollect?: boolean | undefined;
  incorporatePayloadDefinitionForSelectedEffect?: boolean | undefined;

  constructor(data: Omit<IActorCollectableData, 'dataName' | 'effectId'>) {
    Object.assign(this, data);
  }
}


export class FieldCollectableData implements IFieldCollectableData {
  dataName: GatheringStepDataName.Field = GatheringStepDataName.Field;
  possibleFieldsResolver?: ((prev: ICollectedDataStep[]) => IField[]) | undefined;
  possibleFields?: IField[] | undefined;
  payload?: IField | undefined;
  effectId?: string | undefined;
  requireUniqueness: boolean = false;
  autoCollect?: boolean | undefined;
  incorporatePayloadDefinitionForSelectedEffect?: boolean | undefined;

  constructor(data: Omit<IFieldCollectableData, 'dataName' | 'effectId'>) {
    Object.assign(this, data);
  }
}


export class RotationCollectableData implements IRotationCollectableData {
  dataName: GatheringStepDataName.Rotation = GatheringStepDataName.Rotation;
  payload?: number | undefined;
  effectId?: string | undefined;
  requireUniqueness: boolean = false;
  autoCollect?: boolean | undefined;
  incorporatePayloadDefinitionForSelectedEffect?: boolean | undefined;

  constructor(data: Omit<IRotationCollectableData, 'dataName' | 'effectId'>) {
    Object.assign(this, data);
  }
}


export class EffectCollectableData implements IEffectCollectableData {

  dataName: GatheringStepDataName.Effect = GatheringStepDataName.Effect;
  possibleEffectsResolver?: ((prev: ICollectedDataStep[]) => IEffect[]) | undefined;
  possibleEffects?: IEffect[] | undefined;
  payload?: IEffect | undefined;
  effectId?: string | undefined;
  requireUniqueness: boolean = false;
  autoCollect?: boolean | undefined;
  incorporatePayloadDefinitionForSelectedEffect?: boolean | undefined;

  constructor(data: Omit<IEffectCollectableData, 'dataName' | 'effectId'>) {
    Object.assign(this, data);
  }
}


export class SourceActorCollectableData implements ISourceActorCollectableData {
  dataName: GatheringStepDataName.SourceActor = GatheringStepDataName.SourceActor;
  possibleSourceActorIdsResolver?: ((prev: ICollectedDataStep[]) => string[]) | undefined;
  possibleSourceActorIds?: string[] | undefined;
  payload?: string | undefined;
  effectId?: string | undefined;
  requireUniqueness: boolean = false;
  autoCollect?: boolean | undefined;
  incorporatePayloadDefinitionForSelectedEffect?: boolean | undefined;

  constructor(data: Omit<SourceActorCollectableData, 'dataName' | 'effectId'>) {
    Object.assign(this, data);
  }
}
