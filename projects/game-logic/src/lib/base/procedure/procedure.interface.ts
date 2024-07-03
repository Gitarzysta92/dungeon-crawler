import { NonUndefined, ResolvableReference } from "../../infrastructure/extensions/types";
import { IMixin } from "../../infrastructure/mixin/mixin.interface";
import { ProcedureStep } from "./procedure-step";
import { ProcedureExecutionPhase, ProcedureStepTrigger } from "./procedure.constants";

export interface IStepPhaseResult {
  aggregatedData: IAggregatedData[],
  step: IProcedureStep | null,
  executionPhaseType: ProcedureExecutionPhase
}


export interface IProcedureContext {
  performer: IProcedurePerformer
}


export interface IProcedurePerformer {
  listenForEarlyResolve(s: boolean): Promise<boolean>;
}


export interface IProcedure extends IProcedureDeclaration {
  numberOfSteps: number;
  procedureSteps: { [key: string]: ProcedureStep }
  execute(context: IProcedureContext, pa?: (a: any) => void): AsyncGenerator<IStepPhaseResult>
}


export interface IProcedureDeclaration extends IMixin {
  isProcedure: true;
  procedureSteps: { [key: string]: IProcedureStepDeclaration }
}


export interface IProcedureStep extends IProcedureStepDeclaration {
  key: string;
  isInitialStep?: boolean;
  nextStepTrigger?: ProcedureStepTrigger;
  nextStep?: IProcedureStep;
  prevStep?: IProcedureStep;
}


export interface IProcedureStepDeclaration {
  key?: string;
  isInitialStep?: boolean;
  nextStepTrigger?: ProcedureStepTrigger;
  executionsNumber?: ResolvableReference<number>;
  nextStep?: ResolvableReference<IProcedureStepDeclaration>;
  procedure?: ResolvableReference<IProcedureDeclaration>
}


export type IAggregatedData = { [key: string]: NonUndefined };