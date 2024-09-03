import { IFactory } from "../../infrastructure/factory/factory.interface";
import { IMakeActionStepDeclaration } from "./action.interface";
import { MakeActionProcedureStep } from "./make-action.procedure-step";
import { ActionService } from "./action.service";


export class MakeActionProcedureStepFactory implements IFactory<IMakeActionStepDeclaration, MakeActionProcedureStep> {

  constructor(
    private readonly _actionService: ActionService
  ) { }
  
  public static validate<T>(d: IMakeActionStepDeclaration<T>): IMakeActionStepDeclaration<T> {
    return d;
  }
  
  public static isMakeActionStep(data: any): boolean {
    try {
      this.validate(data);
    } catch {
      return false;
    }
    return true;
  }
  
  public static asMakeActionStep<T>(data: T): T & IMakeActionStepDeclaration {
    if (!this.isMakeActionStep(data)) {
      throw new Error("Provided data is not a gathering data procedure step");
    } 
    return data as IMakeActionStepDeclaration & T;
  }

  isApplicable(d: IMakeActionStepDeclaration): boolean {
    return d.isMakeActionStep;
  }

  create(d: IMakeActionStepDeclaration): MakeActionProcedureStep {
    return new MakeActionProcedureStep(d, this._actionService)
  }
}