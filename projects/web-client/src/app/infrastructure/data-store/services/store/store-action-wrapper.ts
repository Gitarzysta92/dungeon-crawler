import { first, Subject, Observable } from "rxjs";

export class StoreActionWrapper {

  public get finished() {
    return this._finished.pipe(first());
  }

  private _fns: Function[];
  private _finished: Subject<void>;

  constructor(fns: Function | Function[]) {
    this._fns = Array.isArray(fns) ? fns : [fns];
    this._finished = new Subject();
  }

  public async execute(): Promise<void> {
    if (this._fns.length === 0) {
      return this._finished.next();
    };
    const fn = this._fns.shift();    
    let result = fn();

    try {
      if (result instanceof Promise) {
        await result;
      } else if (result instanceof Observable) {
        await result.toPromise()
      }
    } catch (error) {
      console.log(error);
      return this._finished.error(error);
    }

    this.execute();
  }
}