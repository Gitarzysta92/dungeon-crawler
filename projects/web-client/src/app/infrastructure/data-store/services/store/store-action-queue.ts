import { Observable } from "rxjs";
import { StoreActionWrapper } from "./store-action-wrapper";

export class StoreActionQueue {
  private _stack: StoreActionWrapper[];

  constructor() {
    this._stack = [];
  }

  public enqueue(functionsSet: Function[] | Function): Observable<void> {
    const action = new StoreActionWrapper(functionsSet); 
    this._stack.push(action);
    if (this._stack.length === 1) {
      this._dequeue();
    }
    return action.finished
  }

  private async _dequeue(): Promise<void> {
    if (this._stack.length === 0) return;
    const action = this._stack.shift();
    await action.execute();
    await this._dequeue();
  }
}