import { IEvent  } from "./event.interface";

export class EventService {

  private _listeners: Map<Function, Function> = new Map();

  public listen(cb: (e: IEvent<unknown>) => void): void {
    this._listeners.set(cb, cb);
  }

  public stopListening(cb: (e: IEvent<unknown>) => void): void {
    this._listeners.delete(cb);
  }

  public emit(e: IEvent<unknown>): void {
    for (let listener of this._listeners.values()) {
      listener(e);
    }
  }
  
}