export class MainLoop {

  private _executionOrders: Function[];
  private _window: Window;

  constructor(window: Window) {
    this._window = window;
    this._executionOrders = [];
  }

  public init(): void {
    this._execute();  
  }

  public onTick(order: () => void) {
    this._executionOrders.push(order);
  }

  private _execute() {
    this._window.requestAnimationFrame(() => this._execute());
    this._executionOrders.forEach(e => e());
  }

}