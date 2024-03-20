import { ValidationError } from "../../extensions/validation-error";
import { IDispatcherDirective } from "./state.interface";
import { IState } from "./state.interface";

export class StateDispatcher<T extends IState> {

  constructor(
    private _setup: { context: T }
  ) { }

  public async next<T extends IState>(directive: IDispatcherDirective, state: T): Promise<T> {
    try {
      await state.onBeforeDirectiveDispatched(directive);
      const activity = await directive(state, this._setup.context);
      state.changesHistory.unshift(activity);
      await state.onPostDirectiveDispatched(directive);

      const prevState = JSON.parse(JSON.stringify(state)) as T;
      prevState.prevState && delete (prevState as any).prevState;
      state.prevState = prevState
      return state;
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        throw error;
        //throw new Error(`Transition between ${current.toString()} and ${activity.name.toString()} failed. Validator name: ${(error as ValidationError).message}:`);
      } else {
        throw error;
      } 
    }
  }

}