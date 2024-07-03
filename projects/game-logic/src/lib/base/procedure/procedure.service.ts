import { IFactory } from "../../infrastructure/factory/factory.interface";
import { ProcedureStep } from "./procedure-step";
import { IProcedureStepDeclaration } from "./procedure.interface";

export class ProcedureService {

  private _stepFactories: IFactory<IProcedureStepDeclaration, ProcedureStep>[] = [];


  public registerStepFactory(f: IFactory<IProcedureStepDeclaration, ProcedureStep>): void {
    this._stepFactories.push(f);
  }

  public createProcedureStep(declaration: IProcedureStepDeclaration): ProcedureStep {
    const factory = this._stepFactories.find(s => s.validate(declaration));
    return factory.create(declaration);
  }
}
