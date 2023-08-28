import { map, distinctUntilChanged,tap } from "rxjs";
import { Quaternion, Vector2, Vector3 } from "three";
import { ActorsManager } from "../../actors/actors-manager";
import { TileObject } from "../../actors/game-objects/tile.game-object";
import { GuiObjectFactory } from "../../actors/gui-objects.factory";
import { GuiObject } from "../../actors/gui-objects/gui-object";
import { AnimationDispatcher } from "../../behaviours/animations/animation.dispatcher";
import { CollisionDispatcher } from "../../behaviours/collision/collision.dispatcher";
import { DragDispatcher } from "../../behaviours/drag/drag.dispatcher";
import { HoverDispatcher } from "../../behaviours/hover/hover.dispatcher";
import { intersectMouseCoordsOnGuiPlane } from "../../helpers/coords-helpers";
import { PointerHandler } from "../../interactions/pointer/pointer-handler";
import { getNormalizedMouseCoordinates2 } from "../../utils/utils";
import { TilesRowComponent, TilesRowPosition } from "./tiles-row.component";


export class StagingComponent {
  private _stagingPlain!: GuiObject;

  public assingToBoardComponent!: (tile: TileObject) => Promise<void>;

  constructor(
    private readonly _actorsManager: ActorsManager,
    private readonly _pointerHandler: PointerHandler,
    private readonly _animationDispatcher: AnimationDispatcher,
    private readonly _dragDispatcher: DragDispatcher,
    private readonly _collisionDispatcher: CollisionDispatcher,
    private readonly _hoverDispatcher: HoverDispatcher,
    private readonly _tilesRowComponent: TilesRowComponent
  ) { 
    this._tilesRowComponent.span = 5;
  }

  public removeTiles(): void {
    this._tilesRowComponent.clear();
  }

  public dragTile(tile: TileObject): void {
    if (!this._tilesRowComponent.has(tile))
      return;

    const { q } = this.translateTileToWorldPosition(tile);
    this._startDraggingAcrossGuiAndBoard(tile, {
      enteredGui: () => {
        tile.object.quaternion.set(q.x, q.y, q.z, q.w);
        this._tilesRowComponent.assignTile(tile);
      },
      enteredBoard: () => {
        this._tilesRowComponent.unassignTile(tile);
        this.assingToBoardComponent(tile);
      }
    });
  }

  public async assignTiles(tiles: TileObject[]): Promise<void> {
    const positions = tiles.reduce((_, t) => this._tilesRowComponent.softTileAssign(t), [] as TilesRowPosition[]);
    const coords = this._getSlotLocalCoords();
    await Promise.all(positions.map(async (p, i) => {
      await this._animationDispatcher.transition(p.tile, coords.v.clone().setX(p.coords.x), null, {
        delay: i * 50
      })
    }));
  }

  public async assignTile(tile: TileObject): Promise<void> {
    const positions = this._tilesRowComponent.softTileAssign(tile);
    const coords = this._getSlotLocalCoords();
    await Promise.all(positions.map(async (p, i) => {
      await this._animationDispatcher.transition(p.tile, coords.v.clone().setX(p.coords.x), null, { delay: i * 10 });
    }));
  }

  public assignTileWithoutAnimation(tile: TileObject): void {
    this._actorsManager.attachToCamera(tile);
    const positions = this._tilesRowComponent.softTileAssign(tile);
    const coords = this._getSlotLocalCoords();
    positions.map(p => {
      const c = coords.v.clone().setX(p.coords.x)
      p.tile.object.position.set(c.x, c.y, c.z);
    })
  }

  public async bringBackTile(tile: TileObject): Promise<void> {
    const positions = this._tilesRowComponent.softTileAssign(tile);
    await Promise.all(positions.map(async p => {
      if (p.tile === tile) {
        let { v: gv, q: gq } = this._getSlotWorldCoords(p.coords.x);
        tile.object.setRotationFromQuaternion(gq);
        await this._animationDispatcher.transition(p.tile, gv)
        this._actorsManager.attachToCamera(tile); 
        let { v, q } = this._getSlotLocalCoords();
        tile.object.position.set(p.coords.x, v.y, v.z);
        tile.object.quaternion.set(q.x, q.y, q.z, q.w);
      } else {
        await this._animationDispatcher.transition(
          p.tile,
          p.tile.mesh.position.clone().setX(p.coords.x)
        );
      }
    }));
  }

  public initializeGuiObjects(): void {
    const planeCoords = new Vector3();
    planeCoords.x = 0;
    planeCoords.setY(-19);
    planeCoords.setZ(-120);
    this._stagingPlain = GuiObjectFactory.createGuiPlane(planeCoords, 20, 10);
    this._actorsManager.initializeObject(this._stagingPlain);
    this._actorsManager.attachToCamera(this._stagingPlain);

    this._hoverDispatcher.startHoverListener(
      (v: Vector2) => this._pointerHandler.intersect(v)
        .filter((x: any) => this._tilesRowComponent.has(x.object)
          && !this._animationDispatcher.isAnimating(x.object))
    )
      .subscribe(r => {
        (r.hovered as TileObject)?.object?.position.setY(-16);
        (r.hovered as TileObject)?.object?.translateZ(2);
        (r.settled as TileObject)?.setCoords((r.settled as TileObject)?.settledCoords);
      });
  }

  public getTargetedTile(x: number, y: number): TileObject {
    const mc = new Vector2();
    const o = this._pointerHandler.intersect(getNormalizedMouseCoordinates2(x, y, mc))
      .find(i => i.object instanceof TileObject)?.object as any;
    return o;
  }

  public translateTileToWorldPosition(tile: TileObject): { v: Vector3, q: Quaternion } {
    let { v, q } = this._getTileWorldCoords(tile);
    this._actorsManager.attachToScene(tile);
    tile.object.position.set(v.x, v.y, v.z);
    tile.object.setRotationFromQuaternion(q);
    return { v, q };
  }

  private _startDraggingAcrossGuiAndBoard(
    tile: TileObject,
    cb: { enteredGui: () => void, enteredBoard: () => void }
  ): void {
    this._dragDispatcher.startDragging(
      tile,
      () => intersectMouseCoordsOnGuiPlane(
        new Vector3(),
        (v: Vector2) => this._pointerHandler.intersect(v)
          .filter((x: any) => x.object === this._stagingPlain || x.object === this._actorsManager.getTerrain()),
      ))
      .pipe(
        tap(c => c.targetObject === this._actorsManager.getTerrain() && tile.object.position.setY(5)),
        map(c => c.targetObject === this._actorsManager.getTerrain() ? "outer" : "inner"),
        distinctUntilChanged()
      )
      .subscribe(c => {
        if (c === "outer") {
          cb.enteredBoard();
          this._collisionDispatcher.startColliding(tile);
        } else {
          cb.enteredGui();
          this._collisionDispatcher.stopColliding(tile);
        }  
      });
  }

  private _getSlotWorldCoords(shiftX: number | null = null): { v: Vector3, q: Quaternion } {
    const v = new Vector3();
    const q = new Quaternion();

    if (shiftX !== null) {
      const initX = this._stagingPlain.mesh.position.x;
      this._stagingPlain.mesh.translateX(shiftX);
      this._stagingPlain.mesh.getWorldPosition(v);
      this._stagingPlain.mesh.position.setX(initX);
    } else {
      this._stagingPlain.mesh.getWorldPosition(v);
    }

    this._stagingPlain.mesh.getWorldQuaternion(q);
    return { v, q };
  }

  private _getSlotLocalCoords(): { v: Vector3, q: Quaternion } {
    const v = this._stagingPlain.mesh.position.clone();
    const q = this._stagingPlain.mesh.quaternion;
    v.z += 1;
    return { v, q };
  }

  private _getTileWorldCoords(tile: TileObject): { v: Vector3, q: Quaternion } {
    const v = new Vector3();
    const q = new Quaternion();
    tile.object.getWorldPosition(v);
    tile.object.getWorldQuaternion(q);
    return { v, q };
  }
}