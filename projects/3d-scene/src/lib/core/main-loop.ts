import Stats from 'stats.js';

export class MainLoop {

  private _executionOrders: Function[];
  public stats!: Stats;

  constructor(
    private readonly _animationFrameProvider: AnimationFrameProvider
  ) {
    this._executionOrders = [];
  }

  public init(): void {
    this.stats = new Stats();
    this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    this.stats.showPanel(1);
    this.stats.showPanel(2);
    document.body.appendChild( this.stats.dom );
    this._execute(performance.now());  
  }

  public onTick(order: (t: number) => void) {
    this._executionOrders.push(order);
  }

  private _execute(t: number) {
    this.stats.begin()
    this._executionOrders.forEach(e => e(t));
    this.stats.end();

    this._animationFrameProvider.requestAnimationFrame((t: number) => this._execute(t));
  }

}