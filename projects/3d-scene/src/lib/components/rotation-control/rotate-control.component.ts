import { ActorsManager } from "../../actors/actors-manager";
import { HoveringService } from "../../behaviors/hoverable/hovering.service";
import { PointerHandler } from "../../interactions/pointer/pointer-handler";
import { getNormalizedCoordinates } from "../../utils/utils";
import { IRotatable } from "../../behaviors/rotatable/rotatable.interface";
import { IBehaviorHolder } from "../../behaviors/behavior-holder.interface";
import { Observable } from "rxjs";
import { RotateControlFactory } from "../../actors/gui-objects/rotate-control/rotate-control.factory";
import { RotateControlObject } from "../../actors/gui-objects/rotate-control/rotate-control.gui-object";
import { Mesh, Vector2 } from "three";
import { IActor } from "../../actors/actor.interface";
import { ROTATION_ANGLES } from "../../behaviors/rotatable/rotatable.constants";


export class RotateControlComponent {

  public rotatable: IRotatable & IBehaviorHolder | undefined;
  public controls: Map<RotateControlObject, RotateControlObject> = new Map();


  constructor(
    private readonly _actorsManager: ActorsManager,
    private readonly _pointerHandler: PointerHandler,
    private readonly _hoverDispatcher: HoveringService,
    private readonly _rotateControlFactory: RotateControlFactory
  ) { }

  public async showControls(
    rotatable: IRotatable & IBehaviorHolder & IActor,
    pointerEvent$: Observable<PointerEvent>
  ): Promise<void> {
    this.hideControls();
    this.rotatable = rotatable;

    (rotatable.object as Mesh).geometry.center();

    this._createControls(rotatable.object.position.x, rotatable.object.position.z);
    this._hoverDispatcher.startHoverListener((v: Vector2) => {
      //console.log(this._pointerHandler.intersect(v));
      return this._pointerHandler.intersect(v).filter((i: any) => this.controls.has(i.object))
    }, pointerEvent$)
  }

  public async hideControls(): Promise<void> {
    for (let control of this.controls.values()) {
      control.dispose();
    }
    this.controls.clear();
    this.rotatable = undefined;
    this._hoverDispatcher.finishHoverListener();
  }

  public async rotateTile(x: number, y: number): Promise<number | undefined> {
    const mc = new Vector2();
    const userData = this._pointerHandler.intersect(getNormalizedCoordinates(x, y, mc)).find((i: any) => this.controls.has(i.object))?.object.object.userData;

    if (!this.rotatable || !userData) {
      return;
    }

    this.rotatable.setRotation(ROTATION_ANGLES[userData.index as keyof typeof ROTATION_ANGLES])

    return userData.index;
  }

  private async _createControls(cx: number, cy: number) {
    const HEXAGON_INNER_ANGLE = 2 * Math.PI / 6;
    const radius = 1.3;
    for (let i = 0; i < 6; i++) {
      let x = cx + (radius * Math.cos(HEXAGON_INNER_ANGLE * (i) + Math.PI));
      let y = cy + (radius * Math.sin(HEXAGON_INNER_ANGLE * (i) + Math.PI));
      const angle = -(Math.PI / 180) * ((i * 60)) 
      const control = await this._rotateControlFactory.create({ definitionName: "rotate-control-definition-name" });
      this._actorsManager.initializeObject(control);
      control.mesh.position.set(x, 0.5, y);
      control.mesh.rotateY(angle);
      control.setUserData({ index: i });
      this.controls.set(control, control);
    }
  }

}