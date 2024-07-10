import { IFactory } from "../../infrastructure/factory/factory.interface";
import { ProcedureStep } from "./procedure-step";
import { IProcedureStepDeclaration } from "./procedure.interface";

export class ProcedureService {

  private _stepFactories: IFactory<IProcedureStepDeclaration, ProcedureStep>[] = [];


  public registerStepFactory(f: IFactory<IProcedureStepDeclaration, ProcedureStep>): void {
    this._stepFactories.push(f);
  }

  public createProcedureStep(declaration: IProcedureStepDeclaration): ProcedureStep {
    if (declaration.procedure) {
      return declaration as ProcedureStep;
    }

    const factory = this._stepFactories.find(s => s.validate(declaration));
    if (!factory) {
      throw new Error(`Cannot find factory for procedure step: ${declaration.key}`)
    }
    return factory.create(declaration);
  }
}
