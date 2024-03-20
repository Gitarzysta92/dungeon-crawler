
export type IDispatcherDirective = (state: IState, context: any) => Promise<IStateChangeRecord>;

export interface IStateChangeRecord {
  name: any;
  playerId?: string;
}

export interface IState {
  changesHistory: IStateChangeRecord[];
  prevState: object | null;
  onBeforeDirectiveDispatched?(d: IDispatcherDirective): Promise<void>;
  onPostDirectiveDispatched?(d: IDispatcherDirective): Promise<void>;
}