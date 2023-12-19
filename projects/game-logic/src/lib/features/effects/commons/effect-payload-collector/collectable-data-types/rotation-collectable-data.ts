import { IBoardObjectRotation } from "../../../../board/board.interface";
import { GatheringStepDataName } from "../effect-payload-collector.constants";
import { ICollectableData, ICollectableDataStep, IPayloadCollectorTempStep, IRotationCollectableDataDefinition, IRotationCollectableDataStep } from "../effect-payload.interface";


export class RotationCollectableDataDefinition implements IRotationCollectableDataDefinition {
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


export class RotationCollectableDataStep implements IRotationCollectableDataStep, IRotationCollectableDataDefinition, IPayloadCollectorTempStep {
  dataName: GatheringStepDataName.Rotation = GatheringStepDataName.Rotation;
  payload?: number;
  effectId: string;
  collectedDataIndex: number;
  prev?: ICollectableDataStep[];
  attemptWasMade: boolean;
  initialPayload?: number;
  possibleRotations?: string[];
  requireUniqueness: boolean;
  initialPayloadResolver: (prev: ICollectableDataStep[]) => number;

  constructor(
    stepData: Omit<IRotationCollectableDataStep, 'dataName'>,
    stepDefinition: IRotationCollectableDataDefinition,
    prevSteps: ICollectableDataStep[]
  ) {
    Object.assign(this, stepDefinition);
    this.initialPayloadResolver = stepDefinition.initialPayloadResolver;
    Object.assign(this, stepData);
    this.prev = prevSteps;
  }

  public initialize(_: ICollectableData[]): void { }
}