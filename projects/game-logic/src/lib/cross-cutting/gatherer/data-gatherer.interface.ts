import { IProcedureController, IProcedureStepDeclaration } from "../../base/procedure/procedure.interface";
import { ResolvableReference } from "../../infrastructure/extensions/types";
import { ISelectorDeclaration } from "../selector/selector.interface";

export interface IGatheringDataStepContext {
  controller: IGatheringController
}

export interface IGatheringDataProcedureStepDeclaration extends IProcedureStepDeclaration {
  isGatheringDataStep: true;
  dataType: string;
  dataSource?: ResolvableReference<unknown>;
  selectors?: ISelectorDeclaration<unknown>[];
  requireUniqueness?: boolean;
  autogather?: boolean;
  gathererParams?: { [key: string]: ResolvableReference<number> };
  payload?: ResolvableReference<IDistinguishableData>;
}

export interface IGatheringContext<AD = unknown, C = unknown, P = { [key: string]: ResolvableReference<number> }> {
  dataType: string,
  allowedData: Array<AD>,
  gathererParams: P,
  steps: IGatheredData<IDistinguishableData>[],
  selectors: ISelectorDeclaration<unknown>[];
  executionContext: C,
  allowEarlyResolve: boolean
}

export interface IGatheringController extends IProcedureController {
  gather(context: IGatheringContext): Promise<IGatheredData<IDistinguishableData>>;
}

export interface IGatheredData<T extends IDistinguishableData> {
  isDataGathered: boolean;
  value: T;
  userData?: unknown
}


export type IDistinguishableData = { id: unknown } | object | number | string | null


export interface IGatherableDataProvider {
  validate(dataType: string): boolean;
  getData(s: ISelectorDeclaration<unknown>[], dataSource?: unknown): Promise<IDistinguishableData[]> | IDistinguishableData[]
}