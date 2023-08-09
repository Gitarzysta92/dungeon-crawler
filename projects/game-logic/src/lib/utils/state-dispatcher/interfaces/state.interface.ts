import { IStateChangeRecord } from "./dispatcher-directive.interface";

export interface IState {
  changesHistory: IStateChangeRecord[]; 
  prevState: IState | null;
}