import { IField } from "../../../../board/board.interface";
import { GatheringStepDataName } from "../effect-payload-collector.constants";
import { ICollectableData, ICollectableDataStep, IFieldCollectableDataDefinition, IFieldCollectableDataStep, IPayloadCollectorTempStep } from "../effect-payload.interface";


export class FieldCollectableDataDefinition implements IFieldCollectableDataDefinition {
  dataName: GatheringStepDataName.Field = GatheringStepDataName.Field;
  possibleFieldsResolver?: ((prev: ICollectableDataStep[]) => IField[]) | undefined;
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


export class FieldCollectableDataStep implements IFieldCollectableDataStep, IFieldCollectableDataDefinition, IPayloadCollectorTempStep {
  dataName: GatheringStepDataName.Field =GatheringStepDataName.Field;
  payload?: IField;
  effectId: string;
  collectedDataIndex: number;
  prev?: ICollectableDataStep[];
  attemptWasMade: boolean;
  initialPayload?: IField;
  possibleFields?: IField[];
  requireUniqueness: boolean;
  possibleFieldsResolver?: ((prev: ICollectableDataStep[]) => IField[]) | undefined;
  initialPayloadResolver: (prev: ICollectableDataStep[]) => IField;

  constructor(
    stepData: Omit<IFieldCollectableDataStep, 'dataName'>,
    stepDefinition: IFieldCollectableDataDefinition,
    prevSteps: ICollectableDataStep[]
  ) {
    Object.assign(this, stepDefinition);
    this.possibleFieldsResolver = stepDefinition.possibleFieldsResolver;
    this.initialPayloadResolver = stepDefinition.initialPayloadResolver;
    Object.assign(this, stepData);
    this.prev = prevSteps;
  }

  public initialize(data: ICollectableData[]): void {
    if (this.possibleFieldsResolver) {
      this.possibleFields = this.possibleFieldsResolver(this.prev);
      if (this.requireUniqueness) {
        const gatheredFieldIds = data.reduce((acc, curr) => {
          return acc.concat(curr.steps
            .filter(gs => gs.dataName === this.dataName && !!gs.payload)
            .map(gs => (gs.payload as IField).id))
        }, [] as string[]);
        this.possibleFields = this.possibleFields.filter(a => !gatheredFieldIds.includes(a.id));
      }
      delete this.possibleFieldsResolver;
    }
    if (this.initialPayloadResolver) {
      this.initialPayload = this.initialPayloadResolver(this.prev);
      delete this.initialPayloadResolver;
    }
  }
}