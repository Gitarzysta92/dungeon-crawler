import { ResolvableReference } from "../../../infrastructure/extensions/types";
import { IProcedureDeclaration, IProcedureStepDeclaration } from "../procedure.interface";


export interface IExecuteProcedureStepDeclaration extends IProcedureStepDeclaration {
  isExecuteProcedureStep: true;
  procedure: ResolvableReference<IProcedureDeclaration>;
}

