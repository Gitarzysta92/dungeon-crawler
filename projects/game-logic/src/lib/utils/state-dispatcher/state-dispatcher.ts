import { ValidationError } from "../../extensions/validation-error";
import { IDispatcherDirective } from "./interfaces/dispatcher-directive.interface";
import { IState } from "./interfaces/state.interface";

export class StateDispatcher {

  constructor(
    private readonly _context?: { [key: string]: any },
  ) { }

  public next<T extends IState>(directive: IDispatcherDirective, state: T): T {
    try {
      const activities = directive(state, this._context);

      for (let activity of activities) {
        state.changesHistory.unshift(activity);
      }
      
      state.prevState = JSON.parse(JSON.stringify(state)) as T;
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