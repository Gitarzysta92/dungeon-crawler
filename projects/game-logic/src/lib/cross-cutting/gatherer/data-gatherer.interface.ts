import { IProcedureController, IProcedureStepDeclaration } from "../../base/procedure/procedure.interface";
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

export interface IGatheringContext<AD = unknown, C = unknown> {
  dataType: string,
  allowedData: Array<AD>,
  gathererParams: { [key: string]: ResolvableReference<number> },
  prev: { [step: string]: IGatheredData<IDistinguishableData>; },
  selectors: ISelectorDeclaration<unknown>[];
  context?: C
}

export interface IGatheringController extends IProcedureController {
  gather(context: IGatheringContext): Promise<IGatheredData<IDistinguishableData | number | string | null>>;
}

export interface IGatheredData<T extends IDistinguishableData | number | string | null> {
  isDataGathered: boolean;
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