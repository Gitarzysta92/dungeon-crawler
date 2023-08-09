import { IState } from "./state.interface";

export type IDispatcherDirective = (state: any & IState, context: any) => IStateChangeRecord[];

export interface IStateChangeRecord {
  name: string | number;
}
