import { IFactory } from "../../../infrastructure/factory/factory.interface";
import { IExecuteProcedureStepDeclaration } from "./execute-procedure.interface";
import { ExecuteProcedureStep } from "./execute-procedure.procedure-step";



export class ExecuteProcedureStepFactory implements IFactory<IExecuteProcedureStepDeclaration, ExecuteProcedureStep> {

  constructor() {}

  public isApplicable(d: IExecuteProcedureStepDeclaration): boolean {
    return d.isExecuteProcedureStep;
  }

  public create(d: IExecuteProcedureStepDeclaration): ExecuteProcedureStep {
    return new ExecuteProcedureStep(d)
  }
}