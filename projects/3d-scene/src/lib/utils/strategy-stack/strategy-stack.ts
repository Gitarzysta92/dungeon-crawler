
export class StrategyStackItem {
  constructor(public cb: () => void) { }
}


export class StrategyStack {
  private _stack: StrategyStackItem[] = [];

  constructor(
    private _default: StrategyStackItem
  ) {}

  public addItem(i: StrategyStackItem): void {
    if (this.has(i)) {
      return;
    }
    this._stack.unshift(i);
    i.cb();
  }

  public removeItem(i: StrategyStackItem): void {
    const index = this._stack.indexOf(i);
    // if out of range
    if (index < 0) {
      return;
      // if top element selected
    } else if (index === 0) {
      this._stack.shift();
      (this._stack[0] ?? this._default).cb();
    } else {
      this._stack = this._stack.filter(i => i !== i);
    }
  }

  public has(i: StrategyStackItem): boolean {
    return this._stack.includes(i);
  }
}







export class StrategyStackV2 {
  private _stack: Function[] = [];

  constructor(
    private _default: Function,
    private _delegateData: unknown
  ) {}

  public addItem(f: Function): void {
    if (this.has(f)) {
      return;
    }
    this._stack.unshift(f);
    f(this._delegateData);
  }

  public removeItem(f: Function): void {
    const index = this._stack.indexOf(f);
    // if out of range
    if (index < 0) {
      return;
      // if top element selected
    } else if (index === 0) {
      this._stack.shift();
      (this._stack[0] ?? this._default)(this._delegateData);
    } else {
      this._stack = this._stack.filter(i => i !== f);
    }
  }

  public has(f: Function): boolean {
    return this._stack.includes(f);
  }
}