import { ResolvableReference } from "../../extensions/types";
import { ISelectorDeclaration } from "../selector/selector.interface";
import { AutoGatherMode } from "./data-gathering.constants";


export interface IGatherableData {
  dataType: string;
  selectors?: ISelectorDeclaration<unknown>[];
  requireUniqueness?: boolean;
  amount?: ResolvableReference<number>;
  autogather?: { mode: AutoGatherMode, amount?: number; };
  gathererParams?: { [key: string]: ResolvableReference<number> };
  payload?: unknown;
}

export interface IGatherableContext {
  data: IGatherableData,
  prev: IGatheredData<unknown>[],
  context?: unknown
}

export interface IGatheredData<T> {
  payload: T;
  revertCb?: () => void;
  isDataGathered: boolean;
  attemptWasMade: boolean;
  gatheringTerminated: boolean;
}

export interface IGatheringHandler<T> {
  dataType: string;
  gather(context: IGatherableContext): Promise<IGatheredData<T>>;
}

export interface IGatheringRequestor {
  getGatherableData(): { data: IGatherableData, prev: IGatheredData<unknown>[] };
  takeData(def: IGatherableData, data: IGatheredData<unknown>): void;
  isSatisfied(): boolean;
  isPartiallySatisfied(): boolean;
}