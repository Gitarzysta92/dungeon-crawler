import { CatmullRomCurve3, PerspectiveCamera } from "three";
import { IContinousTask } from "../lib/utils/tasks-queue/tasks-queue.interface";

export class CameraTask implements IContinousTask {


  public continue = true;
  public elapsedTime = 0;
  public reverse = false;
  private _backwards = false;
  private _t = 0;

  constructor(
    private readonly _cameraCurve: CatmullRomCurve3,
  private readonly _cameraPointCurve: CatmullRomCurve3,
    private readonly _camera: PerspectiveCamera,
    private readonly _animationDuration: number,
    private readonly _animationSpeed: number,
  ) { }
  
  public pass(t: CameraTask): void {
    this.elapsedTime = t.elapsedTime ?? 0;
    this._backwards = t._backwards ?? false;
  }

  public initialize(): void {
    if (this._cameraCurve.getPointAt(1).round().equals(this._camera.position.round())) {
      this.elapsedTime = this._animationDuration;
      this._backwards = true;
    }
  }

  public perform(): void {
    this._t = Math.min(this.elapsedTime / this._animationDuration, 1);
    const position = this._cameraCurve.getPointAt(this._customEasing(this._t));
    this._camera.position.copy(position);

    const position2 = this._cameraPointCurve.getPointAt(this._customEasing(this._t));
    this._camera.lookAt(position2);


    if (this._backwards) {
      if (this.reverse) {
        this.elapsedTime += this._animationSpeed * 1000;
      } else {
        this.elapsedTime -= this._animationSpeed * 1000;
      }
    } else {
      if (this.reverse) {
        this.elapsedTime -= this._animationSpeed * 1000;
      } else {
        this.elapsedTime += this._animationSpeed * 1000;
      }
    }



    
    if (this.elapsedTime >= this._animationDuration || this.elapsedTime < 0) {
      this._finish();
    }
  }

  private _finish(): void {
    this.continue = false;
  }

  private _customEasing(t: number): number {
    return t > 0.5 ? 4*Math.pow((t-1),3)+1 : 4*Math.pow(t,3);
  }
}