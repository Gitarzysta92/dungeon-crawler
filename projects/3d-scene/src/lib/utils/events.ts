import { Observable } from "rxjs";

export type EventType = keyof WindowEventMap;
export type EventCallback<T extends EventType> = (this: Window, ev: WindowEventMap[T]) => any

export class EventHandler {

  private _target: any;
  private _removers: { [key: string]: () => void };

  constructor(target: any) {
    this._target = target;
    this._removers = {};
  }

  public onClick(cb: EventCallback<"click">): () => void {
    return this._createListener('click', cb);
  }

  public resize(cb: EventCallback<"resize">): () => void {
    return this._createListener('resize', cb);
  }

  public mousemove(cb: EventCallback<"mousemove">): () => void {
    return this._createListener('mousemove', cb);
  }

  public onClickAndRelease(cb: EventCallback<"mousedown"> | EventCallback<"mouseup">): () => void {
    const x = this._createListener('mousedown', cb as EventCallback<"mousedown">);
    const b = this._createListener('mouseup', cb as EventCallback<"mouseup">);
    return () => (x(), b());
  }

  public dropListeners() {
    for (let key in this._removers) {
      this._removers[key]?.call(this);
    }
  }

  private _createListener<T extends EventType>(eventType: T, cb: EventCallback<T>): () => void {
    this._target.addEventListener(eventType, cb);
    return this._registerRemover(eventType, cb);
  } 

  private _registerRemover<T extends EventType>(eventType: T,  cb: EventCallback<T>): () => void {
    const uniqueProp = Symbol();
    const remover = () => {
      delete this._removers[uniqueProp as any];
      this._target.removeEventListener(eventType, cb);
    }
    
    Object.defineProperty(this._removers, uniqueProp, {
      value: remover,
      enumerable: true,
      configurable: true
    });

    return remover;
  }

}
