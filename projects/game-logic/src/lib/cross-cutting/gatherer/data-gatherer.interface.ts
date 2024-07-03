
import { IProcedurePerformer, IProcedureStepDeclaration } from "../../base/procedure/procedure.interface";
import { ResolvableReference } from "../../infrastructure/extensions/types";
import { ISelectorDeclaration } from "../selector/selector.interface";
import { AutoGatherMode } from "./data-gathering.constants";


export interface IGatheringDataProcedureStepDeclaration extends IGatherableData, IProcedureStepDeclaration {
  isGatheringDataStep: true
}

export interface IGatheringHandler extends IProcedurePerformer {
  dataType: string;
  gather(context: IGatheringContext): Promise<IGatheredData<unknown>>;
}

export interface IGatheringContext {
  dataType: string,
  allowedData: unknown,
  gathererParams: { [key: string]: ResolvableReference<number> },
  prev: { [step: string]: IGatheredData<unknown>; },
  context?: unknown
}

export interface IGatherableData {
  dataType: string;
  selectors?: ISelectorDeclaration<unknown>[];
  requireUniqueness?: boolean;
  autogather?: { mode: AutoGatherMode, amount?: number; };
  gathererParams?: { [key: string]: ResolvableReference<number> };
  payload?: unknown;
}

export interface IGatheredData<T> {
  payload: T;
  revertCb?: () => void;
  isDataGathered: boolean;
  attemptWasMade: boolean;
  gatheringTerminated: boolean;
}


export interface IGatherableDataProvider {

}







// export interface IGatheringRequestor {
//   getGatherableData(): { data: IGatherableData, prev: IGatheredData<unknown>[] };
//   takeData(def: IGatherableData, data: IGatheredData<unknown>): void;
//   isSatisfied(): boolean;
//   isPartiallySatisfied(): boolean;
// }

// export interface IGathererPayload<T> {
//   dataType: string;
//   allowedData: T;
//   gathererParams?: { [key: string]: ResolvableReference<number>; };
//   prev: IGatheredData<T>[];
//   context?: unknown;
// }