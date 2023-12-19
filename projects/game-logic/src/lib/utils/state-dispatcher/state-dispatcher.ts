import { ValidationError } from "../../extensions/validation-error";
import { IDirectiveMutator, IDispatcherDirective } from "./interfaces/dispatcher-directive.interface";
import { IRevertableState } from "./interfaces/state.interface";

export class StateDispatcher {

  constructor(
    private _setup: {
      context: { [key: string]: any },
      preDirectiveMutators?: IDirectiveMutator[],
      postDirectiveMutators?: IDirectiveMutator[]
    }
  ) { }

  public async next<T extends IRevertableState>(directive: IDispatcherDirective, state: T): Promise<T> {
    try {
      (this._setup.preDirectiveMutators || []).forEach(m => m(state, this._setup.context));
      const activities = await directive(state, this._setup.context);
      for (let activity of activities) {
        state.changesHistory.unshift(activity);
      }
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