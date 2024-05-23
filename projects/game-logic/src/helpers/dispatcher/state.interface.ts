
export type IDispatcherDirective<T> = (state: IState, context: unknown) => Promise<T>;

export interface IState {
  prevStep: object | null;
  onBeforeDirectiveDispatched?(d: IDispatcherDirective<unknown>): Promise<void>;
  onPostDirectiveDispatched?(d: IDispatcherDirective<unknown>): Promise<void>;
}