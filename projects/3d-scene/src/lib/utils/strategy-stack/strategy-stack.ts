
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
    if (index < 0) {
      return;
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