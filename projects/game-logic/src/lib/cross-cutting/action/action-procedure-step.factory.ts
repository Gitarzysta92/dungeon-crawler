import { IFactory } from "../../infrastructure/factory/factory.interface";
import { IMakeActionProcedureStepDeclaration } from "./action.interface";
import { MakeActionProcedureStep } from "./action.procedure-step";
import { ActionService } from "./action.service";


export class MakeActionProcedureStepFactory implements IFactory<IMakeActionProcedureStepDeclaration, MakeActionProcedureStep> {

  constructor(
    private readonly _actionService: ActionService
  ) {}

  validate(d: IMakeActionProcedureStepDeclaration): boolean {
    return d.isMakeActionStep;
  }

  create(d: IMakeActionProcedureStepDeclaration): MakeActionProcedureStep {
    return new MakeActionProcedureStep(d, this._actionService)
  }
}