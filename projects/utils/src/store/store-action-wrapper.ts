import { first, Subject, Observable, firstValueFrom, last } from "rxjs";

export class StoreActionWrapper {

  public name: string;
  public get finished() {
    return this._finished.pipe(last());
  }

  private _fns: Function[];
  private _finished: Subject<void>;

  constructor(name: string, fns: Function | Function[]) {
    this.name = name;
    this._fns = Array.isArray(fns) ? fns : [fns];
    this._finished = new Subject();
  }

  public async execute(): Promise<void> {
    if (this._fns.length === 0) {
      this._finished.next();
      this._finished.complete();
      return;
    };
    const fn = this._fns.shift()!;
    let result = fn();

    try {
      if (result instanceof Promise) {
        await result;
      } else if (result instanceof Observable) {
        await firstValueFrom(result);
      }
    } catch (error) {
      this._finished.error(error);
      throw error;
    }

    await this.execute();
  }
}