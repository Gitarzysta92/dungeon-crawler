import { IProcedurePerformer, IProcedureStepDeclaration } from "../../base/procedure/procedure.interface";
import { ResolvableReference } from "../../infrastructure/extensions/types";
import { ISelectorDeclaration } from "../selector/selector.interface";



export interface IGatheringDataProcedureStepDeclaration extends IProcedureStepDeclaration {
  isGatheringDataStep: true;
  dataType: string;
  selectors?: ISelectorDeclaration<unknown>[];
  requireUniqueness?: boolean;
  autogather?: boolean;
  gathererParams?: { [key: string]: ResolvableReference<number> };
  payload?: ResolvableReference<IDistinguishableData>;
}

export interface IGatheringContext {
  dataType: string,
  allowedData: unknown,
  gathererParams: { [key: string]: ResolvableReference<number> },
  prev: { [step: string]: IGatheredData<IDistinguishableData>; },
  context?: unknown
}

export interface IGatheringHandler extends IProcedurePerformer {
  dataType: string;
  gather(context: IGatheringContext): Promise<IGatheredData<IDistinguishableData>>;
}

export interface IGatheredData<T extends IDistinguishableData> {
  isGatheredData: true;
  value: T;
  revertCb?: () => void;
}

export interface IDistinguishableData {
  id: unknown;
}

export interface IGatherableDataProvider {
  validate(dataType: string): boolean;
  getData(s: ISelectorDeclaration<unknown>[]): Promise<IDistinguishableData[]> | IDistinguishableData[]
}