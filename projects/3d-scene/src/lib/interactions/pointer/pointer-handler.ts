import { Vector2, Intersection, Vector3, Object3D, Raycaster, Ray } from "three";
import { ActorsManager } from "../../actors/actors-manager";
import { View } from "../../internals/scene/view";

export class PointerHandler {
  private _raycaster: Raycaster;

  constructor(
    private readonly _actorsManager: ActorsManager,
    private readonly _view: View
  ) {
    this._raycaster = new Raycaster()
  }

  public intersect(to: Vector2): Intersection[];
  public intersect(to: Vector3): Intersection[];
  public intersect(to: Vector3, from: Vector3): Intersection[];
  public intersect(to: Vector2 | Vector3, from: Vector3 | null = null): Intersection[] {
    if (from && to instanceof Vector3) {
      this._raycaster.set(from, to)
    } else {
      this._raycaster.setFromCamera(to, this._view.camera);
    }

    return this._raycaster.intersectObjects(this._view.scene.children).map(c => {
      c.object = this._actorsManager.actors.get(c.object.uuid) as unknown as Object3D;
      return c;
    });   
  }

  public getAngleAdjencedLength(): number {
    return this._view.controls.getPolarAngle() * this._view.controls.getDistance()
  }


}