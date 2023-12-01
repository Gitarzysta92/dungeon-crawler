import { Observable } from "rxjs";
import { StoreActionWrapper } from "./store-action-wrapper";

export class StoreActionQueue {
  private _stack: StoreActionWrapper[];
  private _processing: boolean = false;

  constructor() {
    this._stack = [];
  }

  public enqueue(
    name: string,
    functionsSet: Function[] | Function
  ): Observable<void> {
    const action = new StoreActionWrapper(name, functionsSet); 
    this._stack.push(action);
    if (!this._processing) {
      this._dequeue();
    }
    return action.finished
  }

  private async _dequeue(): Promise<void> {
    if (this._stack.length === 0) return;
    this._processing = true;
    const action = this._stack.shift();
    await action.execute();
    this._processing = false;
    await this._dequeue();
  }
}