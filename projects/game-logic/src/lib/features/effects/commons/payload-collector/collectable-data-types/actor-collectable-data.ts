import { IActor } from "../../../../actors/actors.interface";
import { GatheringStepDataName } from "../effect-payload-collector.constants";
import { IActorCollectableDataDefinition, IActorCollectableDataStep, ICollectableData, ICollectableDataStep, IPayloadCollectorTempStep } from "../effect-payload.interface";


export class ActorCollectableDataDefinition implements IActorCollectableDataDefinition {
  dataName: GatheringStepDataName.Actor = GatheringStepDataName.Actor;
  possibleActorsResolver?: ((prev: ICollectableDataStep[]) => IActor[]) | undefined;
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



export class ActorCollectableDataStep implements IActorCollectableDataStep, IActorCollectableDataDefinition, IPayloadCollectorTempStep {
  dataName: GatheringStepDataName.Actor =GatheringStepDataName.Actor;
  payload?: IActor;
  effectId: string;
  collectedDataIndex: number;
  prev?: ICollectableDataStep[];
  attemptWasMade: boolean;
  initialPayload?: IActor;
  possibleActors?: IActor[];
  requireUniqueness: boolean;
  possibleActorsResolver?: ((prev: ICollectableDataStep[]) => IActor[]) | undefined;
  initialPayloadResolver: (prev: ICollectableDataStep[]) => IActor;

  constructor(
    stepData: Omit<IActorCollectableDataStep, 'dataName'>,
    stepDefinition: IActorCollectableDataDefinition,
    prevSteps: ICollectableDataStep[]
  ) {
    Object.assign(this, stepDefinition);
    this.possibleActorsResolver = stepDefinition.possibleActorsResolver;
    this.initialPayloadResolver = stepDefinition.initialPayloadResolver;
    Object.assign(this, stepData);
    this.prev = prevSteps;
  }

  public initialize(data: ICollectableData[]): void {
    if (this.possibleActorsResolver) {
      this.possibleActors = this.possibleActorsResolver(this.prev);
      if (this.requireUniqueness) {
        const gatheredActorIds = data.reduce((acc, curr) => {
          return acc.concat(curr.steps
            .filter(gs => gs.dataName === this.dataName && !!gs.payload)
            .map(gs => (gs.payload as IActor).id))
        }, [] as string[]);
        this.possibleActors = this.possibleActors.filter(a => !gatheredActorIds.includes(a.id));
      }
      delete this.possibleActorsResolver;
    }
    if (this.initialPayloadResolver) {
      this.initialPayload = this.initialPayloadResolver(this.prev);
      delete this.initialPayloadResolver;
    }
  }

}
