import Stats from 'stats.js';

export class MainLoop {

  public stats: Stats | undefined;
  private _executionOrders: Function[];
  private _isDisposed: boolean = false;
  hmtlElem: HTMLDivElement | undefined;

  now: number | undefined
  fps = 30;
  fpsInterval = 1000 / this.fps;
  then = Date.now();
  startTime = this.then;
  elapsed: number | undefined;

  private _s = { time: 0, deltaT: 0 };

  constructor(
    private readonly _animationFrameProvider: AnimationFrameProvider
  ) {
    this._executionOrders = [];
  }

  public init(): void {
    this.stats = new Stats();
    // this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    // this.stats.showPanel(1);
    // this.stats.showPanel(2);
    //this.hmtlElem = document.body.appendChild( this.stats.dom );
    this._execute(performance.now());  
  }

  public onTick(order: (s: { time: number, deltaT: number }) => void) {
    this._executionOrders.push(order);
  }

  public dispose() {
    this._executionOrders.length = 0;
    this._isDisposed = true;
    this.hmtlElem?.remove();
    this.stats = undefined;
  }

  private _execute(t: number) {
    if (this._isDisposed) {
      return;
    }
    this._animationFrameProvider.requestAnimationFrame((t: number) => this._execute(t));

    this.now = Date.now();
    this.elapsed = this.now - this.then;
    if (this.elapsed > this.fpsInterval) {
      this.then = this.now - (this.elapsed % this.fpsInterval);
      this.stats?.begin();

      this._s.time = t;
      this._s.deltaT = this.elapsed;

      for (let eo of this._executionOrders) {
        eo(this._s);
      }
      this.stats?.end();
    }
  }

}