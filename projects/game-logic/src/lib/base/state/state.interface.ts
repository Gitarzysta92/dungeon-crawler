export type IDirectiveMutator = (state: IState, context: any) => void;

export type IDispatcherDirective = (state: IState, context: any) => Promise<IStateChangeRecord>;

export interface IStateChangeRecord {
  name: any;
  playerId?: string;
}

export interface IState {
  changesHistory: IStateChangeRecord[]; 
  prevState: object | null;
}