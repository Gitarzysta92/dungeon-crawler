
import { GatheringStepDataName } from "../effect-payload-collector.constants";
import { ICollectableData, ICollectableDataStep, IPayloadCollectorTempStep, ISourceActorCollectableDataDefinition, ISourceActorCollectableDataStep } from "../effect-payload.interface";


export class SourceActorCollectableDataDefinition implements ISourceActorCollectableDataDefinition {
  dataName: GatheringStepDataName.SourceActor = GatheringStepDataName.SourceActor;
  possibleSourceActorIdsResolver?: ((prev: ICollectableDataStep[]) => string[]) | undefined;
  possibleSourceActorIds?: string[] | undefined;
  payload?: string | undefined;
  effectId?: string | undefined;
  requireUniqueness: boolean = false;
  autoCollect?: boolean | undefined;
  incorporatePayloadDefinitionForSelectedEffect?: boolean | undefined;

  constructor(data: Omit<SourceActorCollectableDataDefinition, 'dataName' | 'effectId'>) {
    Object.assign(this, data);
  }
}


export class SourceActorCollectableDataStep implements ISourceActorCollectableDataStep, ISourceActorCollectableDataDefinition, IPayloadCollectorTempStep {
  dataName: GatheringStepDataName.SourceActor = GatheringStepDataName.SourceActor;
  payload?: string;
  effectId: string;
  collectedDataIndex: number;
  prev?: ICollectableDataStep[];
  attemptWasMade: boolean;
  initialPayload?: string;
  possibeleSourceActors?: string[];
  requireUniqueness: boolean;
  possibeleSourceActorsResolver?: ((prev: ICollectableDataStep[]) => string[]) | undefined;
  initialPayloadResolver: (prev: ICollectableDataStep[]) => string;

  constructor(
    stepData: Omit<ISourceActorCollectableDataStep, 'dataName'>,
    stepDefinition: ISourceActorCollectableDataDefinition,
    prevSteps: ICollectableDataStep[]
  ) {
    Object.assign(this, stepDefinition);
    this.possibeleSourceActorsResolver = stepDefinition.possibleSourceActorIdsResolver;
    this.initialPayloadResolver = stepDefinition.initialPayloadResolver;
    Object.assign(this, stepData);
    this.prev = prevSteps;
  }

  public initialize(data: ICollectableData[]): void {
    if (this.possibeleSourceActorsResolver) {
      this.possibeleSourceActors = this.possibeleSourceActorsResolver(this.prev);
      if (this.requireUniqueness) {
        const gatheredSourceActorIds = data.reduce((acc, curr) => {
          return acc.concat(curr.steps
            .filter(gs => gs.dataName === this.dataName && !!gs.payload)
            .map(gs => gs.payload as string))
        }, [] as string[]);
        this.possibeleSourceActors = this.possibeleSourceActors.filter(a => !gatheredSourceActorIds.includes(a));
      }
      delete this.possibeleSourceActorsResolver;
    }
    if (this.initialPayloadResolver) {
      this.initialPayload = this.initialPayloadResolver(this.prev);
      delete this.initialPayloadResolver;
    }
  }
}