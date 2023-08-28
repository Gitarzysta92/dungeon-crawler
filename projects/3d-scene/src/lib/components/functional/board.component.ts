import { Vector2, Quaternion, Vector3 } from "three";
import { ActorsManager } from "../../actors/actors-manager";
import { FieldObject } from "../../actors/game-objects/field.game-object";
import { TileObject } from "../../actors/game-objects/tile.game-object";
import { AnimationDispatcher } from "../../behaviours/animations/animation.dispatcher";
import { CollisionDispatcher } from "../../behaviours/collision/collision.dispatcher";
import { DragDispatcher } from "../../behaviours/drag/drag.dispatcher";
import { PointerHandler } from "../../interactions/pointer/pointer-handler";
import { getNormalizedMouseCoordinates2 } from "../../utils/utils";

export class BoardComponent {

  private _assignedTiles: WeakMap<TileObject, TileObject> = new WeakMap();

  constructor(
    private readonly _actorsManager: ActorsManager,
    private readonly _pointerHandler: PointerHandler,
    private readonly _dragDispatcher: DragDispatcher,
    private readonly _collisionDispatcher: CollisionDispatcher,
    private readonly _animationDispatcher: AnimationDispatcher
  ) { }


  public async assignTile(tile: TileObject): Promise<void> {
    this._assignedTiles.set(tile, tile);
    const { v, q } = this._getSlotCoords();
    this._actorsManager.referenceField.mesh.getWorldQuaternion(q);
    q.setFromAxisAngle(new Vector3(0, 1, 0), Math.PI * 1.5);
    tile.object.quaternion.set(q.x, q.y, q.z, q.w);
    tile.object.rotateX(Math.PI * 1.5);
  }

  public getTargetedField(x: number, y: number): FieldObject | undefined {
    const mc = new Vector2();
    return this._pointerHandler.intersect(getNormalizedMouseCoordinates2(x, y, mc))
      .find(i => i.object instanceof FieldObject)?.object as any;
  }

  public getField(targetFieldId: string): FieldObject | undefined {
    return this._actorsManager.getObject<FieldObject>(targetFieldId);
  }

  public getFieldTargetedByDraggedTile(): FieldObject | undefined {
    const tile = this._dragDispatcher.currentObject;
    return this._collisionDispatcher.getCurrentCollision<FieldObject>(tile)
      ?.filter(o => o instanceof FieldObject)[0];
  }

  public async attachDraggedTileToField(): Promise<FieldObject | undefined> {
    const tile = this._dragDispatcher.currentObject;
    const field = this.getFieldTargetedByDraggedTile();
    this._dragDispatcher.stopDragging();
    
    if (!field) {
      this._collisionDispatcher.stopColliding(tile);
      return;
    }
    
    await this.attachTileToField(tile, field);
    return field;
  }

  public async attachTileToField(tile: TileObject, field: FieldObject): Promise<void> {
    const { coords, quat } = field.takeBy(tile);
    await this._animationDispatcher.transition(tile, coords, quat);
    this._collisionDispatcher.stopColliding(tile);
  }

  public attachTileToFieldWithoutAnimation(tile: TileObject, field: FieldObject): void {
    const fieldCoords = field.takeBy(tile);
    tile.setCoords(fieldCoords.coords);
    tile.setQuaternion(fieldCoords.quat)
   
  }

  public async detachTileFromField(tile: TileObject): Promise<void> {
    tile.takesField = null as unknown as string;
    const coords = tile.coords.clone();
    coords.y = 5;
    await this._animationDispatcher.transition(tile, coords);
  }


  private _getSlotCoords(): { v: Vector3, q: Quaternion } {
    const v = new Vector3();
    const q = new Quaternion()
      .setFromAxisAngle(new Vector3(1, 0, 0), -Math.PI * 0.5)
      .multiply(new Quaternion().setFromAxisAngle(new Vector3(0, 0, 1), Math.PI* 0.8));
    v.setY(-15);
    v.setZ(-100);
    //this.gameView.camera.getWorldPosition(v);
    //this.gameView.camera.getWorldQuaternion(q);
    return { v, q };
  }

  initializeGuiObjects(): void {
    throw new Error("Method not implemented.");
  }

}