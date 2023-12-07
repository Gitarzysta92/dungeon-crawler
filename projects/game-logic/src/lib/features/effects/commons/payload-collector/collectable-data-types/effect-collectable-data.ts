import { GatheringStepDataName } from "../effect-payload-collector.constants";
import { ICollectableData, ICollectableDataDefinition, ICollectableDataStep, IEffectCollectableDataDefinition, IEffectCollectableDataStep, IPayloadCollectorTempStep } from "../effect-payload.interface";
import { IEffect } from "../../../resolve-effect.interface";


export class EffectCollectableDataDefinition implements IEffectCollectableDataDefinition {
  dataName: GatheringStepDataName.Effect = GatheringStepDataName.Effect;
  possibleEffectsResolver?: ((prev: ICollectableDataStep[]) => IEffect[]) | undefined;
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


export class EffectCollectableDataStep implements IEffectCollectableDataStep, IEffectCollectableDataDefinition, IPayloadCollectorTempStep {
  dataName: GatheringStepDataName.Effect =GatheringStepDataName.Effect;
  payload?: IEffect;
  effectId: string;
  collectedDataIndex: number;
  prev?: ICollectableDataStep[];
  attemptWasMade: boolean;
  initialPayload?: IEffect;
  possibleEffects?: IEffect[];
  requireUniqueness: boolean;
  possibleEffectsResolver?: ((prev: ICollectableDataStep[]) => IEffect[]) | undefined;
  initialPayloadResolver: (prev: ICollectableDataStep[]) => IEffect;

  constructor(
    stepData: Omit<IEffectCollectableDataStep, 'dataName'>,
    stepDefinition: IEffectCollectableDataDefinition,
    prevSteps: ICollectableDataStep[]
  ) {
    Object.assign(this, stepDefinition);
    this.possibleEffectsResolver = stepDefinition.possibleEffectsResolver;
    this.initialPayloadResolver = stepDefinition.initialPayloadResolver;
    Object.assign(this, stepData);
    this.prev = prevSteps;
  }

  public initialize(data: ICollectableData[]): void {
    if (this.possibleEffectsResolver) {
      this.possibleEffects = this.possibleEffectsResolver(this.prev);
      if (this.requireUniqueness) {
        const gatheredEffectIds = data.reduce((acc, curr) => {
          return acc.concat(curr.steps
            .filter(gs => gs.dataName === this.dataName && !!gs.payload)
            .map(gs => (gs.payload as IEffect).id))
        }, [] as string[]);
        this.possibleEffects = this.possibleEffects.filter(a => !gatheredEffectIds.includes(a.id));
      }
      delete this.possibleEffectsResolver;
    }
    if (this.initialPayloadResolver) {
      this.initialPayload = this.initialPayloadResolver(this.prev);
      delete this.initialPayloadResolver;
    }
  }

}

