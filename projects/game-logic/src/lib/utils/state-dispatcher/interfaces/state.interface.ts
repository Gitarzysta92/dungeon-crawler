import { IStateChangeRecord } from "./dispatcher-directive.interface";

export interface IRevertableState {
  changesHistory: IStateChangeRecord[]; 
  prevState: object | null;
}