import { IFactory } from "../../infrastructure/factory/factory.interface";
import { IGatheringDataStepDeclaration } from "./data-gatherer.interface";
import { DataGatheringService } from "./data-gathering.service";
import { GatheringDataProcedureStep } from "./gathering-data.procedure-step";

export class GatheringDataProcedureStepFactory implements IFactory<IGatheringDataStepDeclaration, GatheringDataProcedureStep> {

  constructor(
    private readonly _dataGatheringService: DataGatheringService
  ) { }

  public static validate<T extends IGatheringDataStepDeclaration>(d: T): T {
    return d;
  }
  
  public static isGatheringDataStep(data: any): boolean {
    try {
      this.validate(data);
    } catch {
      return false;
    }
    return true;
  }
  
  public static asGatheringDataStep<T>(data: T): T & IGatheringDataStepDeclaration {
    if (!this.isGatheringDataStep(data)) {
      throw new Error("Provided data is not a gathering data procedure step");
    } 
    return data as IGatheringDataStepDeclaration & T;
  }


  public isApplicable(d: IGatheringDataStepDeclaration): boolean {
    return d.isGatheringDataStep;
  }

  public create(d: IGatheringDataStepDeclaration): GatheringDataProcedureStep {
    return new GatheringDataProcedureStep(d, this._dataGatheringService)
  }
}