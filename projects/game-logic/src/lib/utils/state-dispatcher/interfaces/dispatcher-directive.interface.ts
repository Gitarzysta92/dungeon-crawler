import { IRevertableState } from "./state.interface";

export type IDirectiveMutator = (state: any & IRevertableState, context: any) => void;

export type IDispatcherDirective = (state: any & IRevertableState, context: any) => Promise<IStateChangeRecord[]>;

export interface IStateChangeRecord {
  name: any;
  playerId?: string;
}
