import { ValidationError } from "../../lib/infrastructure/extensions/validation-error";
import { IDispatcherDirective, IState } from "./state.interface";

export class StateDispatcher<T extends IState> {

  constructor(
    private _setup: { context: T }
  ) { }

  public async next<T extends IState>(directive: IDispatcherDirective<unknown>, state: T): Promise<T> {
    try {
      await state.onBeforeDirectiveDispatched(directive);
      const activity = await directive(state, this._setup.context);
      //state.changesHistory.unshift(activity);
      await state.onPostDirectiveDispatched(directive);

      const prevState = JSON.parse(JSON.stringify(state)) as T;
      prevState.prevStep && delete (prevState as any).prevState;
      state.prevStep = prevState
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