import { IFactory } from "../../infrastructure/factory/factory.interface";
import { IGatheringDataProcedureStepDeclaration } from "./data-gatherer.interface";
import { DataGatheringService } from "./data-gathering.service";
import { GatheringDataProcedureStep } from "./gathering-data.procedure-step";

export class GatheringDataProcedureStepFactory implements IFactory<IGatheringDataProcedureStepDeclaration, GatheringDataProcedureStep> {

  constructor(
    private readonly _dataGatheringService: DataGatheringService
  ) {}

  validate(d: IGatheringDataProcedureStepDeclaration): boolean {
    return d.isGatheringDataStep;
  }

  create(d: IGatheringDataProcedureStepDeclaration): GatheringDataProcedureStep {
    return new GatheringDataProcedureStep(d, this._dataGatheringService)
  }
}