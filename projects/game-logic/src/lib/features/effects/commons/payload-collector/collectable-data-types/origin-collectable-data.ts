import { IBoardSelectorOrigin } from "../../../../board/board.interface";
import { GatheringStepDataName } from "../effect-payload-collector.constants";
import { ICollectableData, ICollectableDataStep, IOriginCollectableDataDefinition, IOriginCollectableDataStep, IPayloadCollectorTempStep } from "../effect-payload.interface";


export class OriginCollectableDataDefinition implements IOriginCollectableDataDefinition {
  dataName: GatheringStepDataName.Origin = GatheringStepDataName.Origin;
  possibleOriginsResolver?: ((prev: ICollectableDataStep[]) => IBoardSelectorOrigin[]) | undefined;
  possibleOrigins?: IBoardSelectorOrigin[] | undefined;
  payload?: IBoardSelectorOrigin | undefined;
  effectId?: string | undefined;
  requireUniqueness: boolean = false;
  autoCollect?: boolean | undefined;
  incorporatePayloadDefinitionForSelectedEffect?: boolean | undefined;

  constructor(data: Omit<IOriginCollectableDataDefinition, 'dataName' | 'effectId'>) {
    Object.assign(this, data);
  }
}


export class OriginCollectableDataStep implements IOriginCollectableDataStep, IOriginCollectableDataDefinition, IPayloadCollectorTempStep {
  dataName: GatheringStepDataName.Origin =GatheringStepDataName.Origin;
  payload?: IBoardSelectorOrigin;
  effectId: string;
  collectedDataIndex: number;
  prev?: ICollectableDataStep[];
  attemptWasMade: boolean;
  initialPayload?: IBoardSelectorOrigin;
  possibleOrigins?: IBoardSelectorOrigin[];
  requireUniqueness: boolean;
  possibleOriginsResolver?: ((prev: ICollectableDataStep[]) => IBoardSelectorOrigin[]) | undefined;
  initialPayloadResolver: (prev: ICollectableDataStep[]) => IBoardSelectorOrigin;

  constructor(
    stepData: Omit<IOriginCollectableDataStep, 'dataName'>,
    stepDefinition: IOriginCollectableDataDefinition,
    prevSteps: ICollectableDataStep[]
  ) {
    Object.assign(this, stepDefinition);
    this.possibleOriginsResolver = stepDefinition.possibleOriginsResolver;
    this.initialPayloadResolver = stepDefinition.initialPayloadResolver;
    Object.assign(this, stepData);
    this.prev = prevSteps;
  }

  public initialize(data: ICollectableData[]): void {
    if (this.possibleOriginsResolver) {
      this.possibleOrigins = this.possibleOriginsResolver(this.prev);
      if (this.requireUniqueness) {
        const gatheredFieldIds = data.reduce((acc, curr) => {
          return acc.concat(curr.steps
            .filter(gs => gs.dataName === this.dataName && !!gs.payload)
            .map(gs => (gs.payload as IBoardSelectorOrigin)))
        }, []);
        this.possibleOrigins = this.possibleOrigins.filter(a => !gatheredFieldIds.includes(a));
      }
      delete this.possibleOriginsResolver;
    }
    if (this.initialPayloadResolver) {
      this.initialPayload = this.initialPayloadResolver(this.prev);
      delete this.initialPayloadResolver;
    }
  }

}