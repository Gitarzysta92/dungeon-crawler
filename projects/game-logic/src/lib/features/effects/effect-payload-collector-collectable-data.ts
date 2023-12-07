import { IActor } from "../actors/actors.interface";
import { IBoardSelectorOrigin, IField } from "../board/board.interface";
import { GatheringStepDataName } from "./effect-payload-collector.constants";
import { IActorCollectableDataDefinition, ICollectedDataStep, IEffectCollectableDataDefinition, IFieldCollectableDataDefinition, IOriginCollectableDataDefinition, IRotationCollectableDataDefinition, ISourceActorCollectableDataDefinition } from "./effect-payload.interface";
import { IEffect } from "./resolve-effect.interface";

export class OriginCollectableData implements IOriginCollectableDataDefinition {
  dataName: GatheringStepDataName.Origin = GatheringStepDataName.Origin;
  possibleOriginsResolver?: ((prev: ICollectedDataStep[]) => IBoardSelectorOrigin[]) | undefined;
  possibleOrigins?: IBoardSelectorOrigin[] | undefined;
  payload?: IBoardSelectorOrigin | undefined;
  effectId?: string | undefined;
  requireUniqueness: boolean = false;
  autoCollect?: boolean | undefined;
  incorporatePayloadDefinitionForSelectedEffect?: boolean | undefined;

  constructor(data: Omit<IOriginCollectableDataDefinition, 'dataName'|'effectId'>) {
    Object.assign(this, data);
  }
}


export class ActorCollectableData implements IActorCollectableDataDefinition {
  dataName: GatheringStepDataName.Actor = GatheringStepDataName.Actor;
  possibleActorsResolver?: ((prev: ICollectedDataStep[]) => IActor[]) | undefined;
  possibleActors?: IActor[] | undefined;
  payload?: IActor | undefined;
  effectId?: string | undefined;
  requireUniqueness: boolean = false;
  autoCollect?: boolean | undefined;
  incorporatePayloadDefinitionForSelectedEffect?: boolean | undefined;

  constructor(data: Omit<IActorCollectableDataDefinition, 'dataName' | 'effectId'>) {
    Object.assign(this, data);
  }
}


export class FieldCollectableData implements IFieldCollectableDataDefinition {
  dataName: GatheringStepDataName.Field = GatheringStepDataName.Field;
  possibleFieldsResolver?: ((prev: ICollectedDataStep[]) => IField[]) | undefined;
  possibleFields?: IField[] | undefined;
  payload?: IField | undefined;
  effectId?: string | undefined;
  requireUniqueness: boolean = false;
  autoCollect?: boolean | undefined;
  incorporatePayloadDefinitionForSelectedEffect?: boolean | undefined;

  constructor(data: Omit<IFieldCollectableDataDefinition, 'dataName' | 'effectId'>) {
    Object.assign(this, data);
  }
}


export class RotationCollectableData implements IRotationCollectableDataDefinition {
  dataName: GatheringStepDataName.Rotation = GatheringStepDataName.Rotation;
  payload?: number | undefined;
  effectId?: string | undefined;
  requireUniqueness: boolean = false;
  autoCollect?: boolean | undefined;
  incorporatePayloadDefinitionForSelectedEffect?: boolean | undefined;

  constructor(data: Omit<IRotationCollectableDataDefinition, 'dataName' | 'effectId'>) {
    Object.assign(this, data);
  }
}


export class EffectCollectableData implements IEffectCollectableDataDefinition {

  dataName: GatheringStepDataName.Effect = GatheringStepDataName.Effect;
  possibleEffectsResolver?: ((prev: ICollectedDataStep[]) => IEffect[]) | undefined;
  possibleEffects?: IEffect[] | undefined;
  payload?: IEffect | undefined;
  effectId?: string | undefined;
  requireUniqueness: boolean = false;
  autoCollect?: boolean | undefined;
  incorporatePayloadDefinitionForSelectedEffect?: boolean | undefined;

  constructor(data: Omit<IEffectCollectableDataDefinition, 'dataName' | 'effectId'>) {
    Object.assign(this, data);
  }
}


export class SourceActorCollectableData implements ISourceActorCollectableDataDefinition {
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
