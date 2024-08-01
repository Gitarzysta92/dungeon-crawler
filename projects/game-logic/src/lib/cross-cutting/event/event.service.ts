import { IEvent } from "./event.interface";

export class EventService {

  private _listeners: Map<Function, Function> = new Map();

  private _listeners2: { [key: string]: Function[] } = {};

  private _listeners3: Function[] = [];

  public listenForEvent<T>(e: string, cb: (e: T) => void, fp?: (e: T) => boolean): void {
    if (e in this._listeners2) {
      this._listeners2[e].push(cb);
    } else {
      this._listeners2[e] = [];
      this._listeners2[e].push(cb);
    }
  }

  public listenAll(cb: (c: IEvent<unknown>) => void): void {
    this._listeners3.push(cb);
  }

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
    if (this._listeners2[e.delegateId]) {
      this._listeners2[e.delegateId].forEach(d => d(e))
    }
    this._listeners3.forEach(d => d(e))
  }

  public async process<T extends IEvent<unknown>>(e: T): Promise<void> {
    for (let listener of this._listeners.values()) {
      await listener(e);
    }
    if (this._listeners2[e.delegateId]) {
      await Promise.all(this._listeners2[e.delegateId]?.map(d => d(e)))
    }
    this._listeners3.forEach(d => d(e))
  }
  
}