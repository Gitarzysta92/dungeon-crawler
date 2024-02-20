import { ValidationError } from "../../extensions/validation-error";
import { IDirectiveMutator, IDispatcherDirective } from "./state.interface";
import { IState } from "./state.interface";

export class StateDispatcher<T> {

  constructor(
    private _setup: {
      context: T,
      preDirectiveMutators?: IDirectiveMutator[],
      postDirectiveMutators?: IDirectiveMutator[]
    }
  ) { }

  public async next<T extends IState>(directive: IDispatcherDirective, state: T): Promise<T> {
    try {

      (this._setup.preDirectiveMutators || []).forEach(m => m(state, this._setup.context));
      const activity = await directive(state, this._setup.context);
      state.changesHistory.unshift(activity);
      (this._setup.postDirectiveMutators || []).forEach(m => m(state, this._setup.context));

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