import { NonUndefined, ResolvableReference } from "../../infrastructure/extensions/types";
import { IMixin } from "../../infrastructure/mixin/mixin.interface";
import { IPlayerController } from "../player/players.interface";
import { ProcedureStep } from "./procedure-step";
import { ProcedureExecutionPhase, ProcedureStepTrigger } from "./procedure.constants";

export interface IProcedureExecutionStatus<PS extends IProcedureStepDeclaration = IProcedureStepDeclaration, ED = unknown> {
  aggregatedData: IAggregatedData[],
  step: PS | null,
  executionPhaseType: ProcedureExecutionPhase,
  executionData?: IteratorResult<ED> | Promise<ED>
  isSuccessful?: boolean
}

export interface IProcedureContext {
  controller: IProcedureController;
  data: unknown;
}

export interface IProcedureController extends IPlayerController {

}


export interface IProcedure extends IProcedureDeclaration {
  numberOfSteps: number;
  procedureSteps: { [key: string]: ProcedureStep };
  initialStep: ProcedureStep;
  perform(context: IProcedureContext, pa?: (a: any) => void): AsyncGenerator<IProcedureExecutionStatus>;
  initializeSteps(d: IProcedureDeclaration): { [key: string]: ProcedureStep; }
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
}

export interface IProcedureStepResult {
  continueExecution: boolean;
}


export type IAggregatedData = { [key: string]: NonUndefined };