import { Quaternion, Vector2, Vector3 } from "three";
import { ActorsManager } from "../../actors/actors-manager";
import { TileObject } from "../../actors/game-objects/tile.game-object";
import { GuiObjectFactory } from "../../actors/gui-objects.factory";
import { InteractiveGuiObject } from "../../actors/gui-objects/interactive-gui-object";
import { AnimationDispatcher } from "../../behaviours/animations/animation.dispatcher";
import { HoverDispatcher } from "../../behaviours/hover/hover.dispatcher";
import { PointerHandler } from "../../interactions/pointer/pointer-handler";
import { getNormalizedMouseCoordinates2 } from "../../utils/utils";


export class RotateTileControlComponent {

  private _tile: TileObject | undefined;
  private _leftArrow: InteractiveGuiObject | undefined;
  private _rightArrow: InteractiveGuiObject | undefined;
  
  constructor(
    private readonly _actorsManager: ActorsManager,
    private readonly _pointerHandler: PointerHandler,
    private readonly _hoverDispatcher: HoverDispatcher,
    private readonly _animationDispather: AnimationDispatcher
  ) { }

  public async showMenu(tile: TileObject, cfg: any): Promise<void> {
    this.hideMenu();

    this._leftArrow = GuiObjectFactory.createRotateArrow(tile.mesh.position.clone(), cfg)
    this._actorsManager.initializeObject(this._leftArrow);
    tile.mesh.add(this._leftArrow.mesh);
    this._leftArrow.mesh.rotateOnAxis(new Vector3(0, 0, 1), Math.PI/2);
    this._leftArrow.mesh.position.setX(0);
    this._leftArrow.mesh.position.setY(0);
    this._leftArrow.mesh.position.setZ(0);


    this._rightArrow = GuiObjectFactory.createRotateArrow(tile.mesh.position.clone(), cfg)
    this._actorsManager.initializeObject(this._rightArrow);
    tile.mesh.add(this._rightArrow.mesh);

    this._rightArrow.mesh.rotateOnAxis(new Vector3(0, 1, 0), Math.PI);
    this._rightArrow.mesh.rotateOnAxis(new Vector3(0, 0, 1), Math.PI);
    this._rightArrow.mesh.position.setX(0);
    this._rightArrow.mesh.position.setY(0);
    this._rightArrow.mesh.position.setZ(0);

    this._tile = tile;
    this._hoverDispatcher.startHoverListener(
      (v: Vector2) => this._pointerHandler.intersect(v)
        .filter((i: any) => i.object as any === this._leftArrow || i.object as any === this._rightArrow))
  }

  public async hideMenu(): Promise<void> {
    this._tile?.mesh.remove(this._leftArrow?.mesh!);
    this._tile?.mesh.remove(this._rightArrow?.mesh!);
    this._tile = undefined;
  }

  public async rotateTile(x: number, y: number): Promise<void> {
    const mc = new Vector2();
    const arrow = this._pointerHandler.intersect(getNormalizedMouseCoordinates2(x, y, mc))
      .find((i: any) => i.object as any === this._leftArrow || i.object as any === this._rightArrow)?.object as any;

    if (!this._tile || !arrow) {
      return;
    }
      
    const q = new Quaternion();
    if (arrow === this._leftArrow) {
      q.setFromAxisAngle(new Vector3(0, 1, 0).normalize(), (Math.PI / 3)).invert().multiply(this._tile.quaternion);
    } else if (arrow === this._rightArrow) {
      q.setFromAxisAngle(new Vector3(0, 1, 0).normalize(), (Math.PI / 3)).multiply(this._tile.quaternion);
    }
    this._animationDispather.rotate(this._tile, q);
  }


}