export class OffscreenCanvasWrapper {
 
  public ctx!: CanvasRenderingContext2D;
  private _canvas!: HTMLCanvasElement;

  constructor(
    private _width: number,
    private _height: number,
    private _scale: number
  ) {}

  public initialize() {
    this._canvas = document.createElement('canvas');
    document.body.appendChild(this._canvas);
    this._canvas.width = this._width;
    this._canvas.height = this._height;
    this._canvas.style.setProperty("position", "absolute");
    this._canvas.style.setProperty("top", "0");
    this._canvas.style.setProperty("right", "0");
    this._canvas.style.setProperty("z-index", "9999");
    this.ctx = this._canvas.getContext('2d')!;
  }

  public getImageData() {
    return this.ctx.getImageData(0, 0, this._width, this._height, { colorSpace: "srgb" }).data;
  }

  public convertToCanvasCoordinates(point: any) {
    return {
        x: point.x * this._scale,
        y: point.y * this._scale
    };
  }

  clear() {
    this.ctx.clearRect(0, 0, this._width, this._height);
  }
}