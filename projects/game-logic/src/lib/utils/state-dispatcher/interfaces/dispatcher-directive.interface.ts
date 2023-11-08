import { IState } from "./state.interface";

export type IDirectiveMutator = (state: any & IState, context: any) => void;

export type IDispatcherDirective = (state: any & IState, context: any) => Promise<IStateChangeRecord[]>;

export interface IStateChangeRecord {
  name: any;
}
