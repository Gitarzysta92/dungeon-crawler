import { Vector2, Vector3 } from "three";
import { ActorsManager } from "../../actors/actors-manager";
import { HoveringService } from "../../behaviors/hoverable/hovering.service";
import { PointerHandler } from "../../interactions/pointer/pointer-handler";
import { getNormalizedMouseCoordinates2 } from "../../utils/utils";
import { RotateArrowObject } from "../../actors/gui-objects/rotate-arrow/rotate-arrow.gui-object";
import { RotateArrowFactory } from "../../actors/gui-objects/rotate-arrow/rotate-arrow.factory";
import { IRotatable } from "../../behaviors/rotatable/rotatable.interface";
import { IBehaviorHolder } from "../../behaviors/behavior-holder.interface";
import { IRotateArrowCreationDefinition } from "../../actors/gui-objects/rotate-arrow/rotate-arrow.interface";
import { Observable } from "rxjs";


export class RotateControlComponent {

  public rotatable: IRotatable & IBehaviorHolder | undefined;

  private _leftArrow: RotateArrowObject | undefined;
  private _rightArrow: RotateArrowObject | undefined;
  private _cfg: IRotateArrowCreationDefinition = {
    definitionName: "rotate-arrow-definition-name",
    color: 0,
    auxId: "",
    auxCoords: ""
  }

  constructor(
    private readonly _actorsManager: ActorsManager,
    private readonly _pointerHandler: PointerHandler,
    private readonly _hoverDispatcher: HoveringService,
    private readonly _rotateArrowFactory: RotateArrowFactory
  ) { }

  public async showControls(
    rotatable: IRotatable & IBehaviorHolder,
    pointerEvent$: Observable<PointerEvent>
  ): Promise<void> {
    this.hideControls();

    this._leftArrow = await this._rotateArrowFactory.create(this._cfg);
    this._actorsManager.initializeObject(this._leftArrow);
    rotatable.object.add(this._leftArrow.mesh);
    this._leftArrow.mesh.position.setX(0);
    this._leftArrow.mesh.position.setY(0);
    this._leftArrow.mesh.position.setZ(0);


    this._rightArrow = await this._rotateArrowFactory.create(this._cfg);
    this._actorsManager.initializeObject(this._rightArrow);
    rotatable.object.add(this._rightArrow.mesh);

    this._rightArrow.mesh.rotateOnAxis(new Vector3(0, 1, 0), Math.PI);
    this._rightArrow.mesh.position.setX(0);
    this._rightArrow.mesh.position.setY(0);
    this._rightArrow.mesh.position.setZ(0);

    this.rotatable = rotatable;
    this._hoverDispatcher.startHoverListener(
      (v: Vector2) => this._pointerHandler.intersect(v)
        .filter((i: any) => i.object as any === this._leftArrow || i.object as any === this._rightArrow), pointerEvent$)
  }

  public async hideControls(): Promise<void> {
    this.rotatable?.object.remove(this._leftArrow?.mesh!);
    this.rotatable?.object.remove(this._rightArrow?.mesh!);
    this.rotatable = undefined;
  }

  public async rotateTile(x: number, y: number): Promise<number | undefined> {
    const mc = new Vector2();
    const arrow = this._pointerHandler.intersect(getNormalizedMouseCoordinates2(x, y, mc))
      .find((i: any) => i.object as any === this._leftArrow || i.object as any === this._rightArrow)?.object as any;

    if (!this.rotatable || !arrow) {
      return;
    }

    return arrow === this._leftArrow ? 1 : -1;
  }

}