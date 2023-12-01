import { Quaternion, Vector2, Vector3 } from "three";
import { ActorsManager } from "../../actors/actors-manager";
import { TileObject } from "../../actors/game-objects/tile.game-object";
import { GuiObject } from "../../actors/gui-objects/gui-object";
import { getNormalizedMouseCoordinates2 } from "../../utils/utils";
import { TilesRowComponent } from "./tiles-row.component";
import { PointerHandler } from "../../interactions/pointer/pointer-handler";
import { GuiObjectFactory } from "../../actors/gui-objects.factory";


export class DialogComponent  {

  public assignToStagingComponent!: (tile: TileObject[]) => Promise<void>;
  public isOpen: boolean = false;
  private _dialogPlain!: GuiObject;

  constructor(
    private readonly _actorsManager: ActorsManager,
    private readonly _pointerHandler: PointerHandler,
    private readonly _tilesRowComponent: TilesRowComponent
  ) { 
    this._tilesRowComponent.span = 11;
  }

  public initializeGuiObjects(): void {
    const planeCoords = new Vector3();
    planeCoords.x = 0;
    planeCoords.setY(0);
    planeCoords.setZ(-120);
    this._dialogPlain = GuiObjectFactory.createGuiPlane(planeCoords, 50, 20);
    this._actorsManager.initializeObject(this._dialogPlain);
    this._actorsManager.attachToCamera(this._dialogPlain);
    this.hideDialog();
  }

  public openDialog(): void {
    this._tilesRowComponent.tiles.forEach(t => t.mesh.visible = true);
    this._dialogPlain.mesh.visible = true;
    this.isOpen = true;
  }

  public hideDialog(): void {
    this._dialogPlain.mesh.visible = false;
    this._tilesRowComponent.tiles.forEach(t => t.mesh.visible = false);
  }

  public closeDialog(): void {
    this._dialogPlain.mesh.visible = false;
    this.isOpen = false;
    this._tilesRowComponent.tiles.forEach(t => t.mesh.visible = false);
    this._tilesRowComponent.clear();
  }

  public assignTile(tile: TileObject): void {
    this._actorsManager.attachToCamera(tile);
    this._tilesRowComponent.assignTile(tile);
    this._tilesRowComponent.tiles.forEach(t => t.mesh.visible = this.isOpen);
  }

  public async moveTilesToStaging(tiles: TileObject[]): Promise<void> {

    for (let tile of this._tilesRowComponent.tiles.keys()) {
      this._tilesRowComponent.unassignTile(tile);

      if (!tiles.find(t => t === tile)) {
        this._actorsManager.detachFromCamera(tile);
      }
    }

    await this.assignToStagingComponent(tiles);
    if (this._tilesRowComponent.isEmpty()) {
      this.closeDialog();
    }
  } 
  

  public getTargetedTile(x: number, y: number): TileObject {
    const mc = new Vector2();
    const o = this._pointerHandler.intersect(getNormalizedMouseCoordinates2(x, y, mc))
      .find((i: any) => i.object instanceof TileObject)?.object as any;
    return o;
  }


  private _getSlotWorldCoords(): { v: Vector3, q: Quaternion } {
    const v = new Vector3();
    const q = new Quaternion();
    this._dialogPlain.mesh.getWorldPosition(v);
    this._dialogPlain.mesh.getWorldQuaternion(q);
    return { v, q };
  }

  private _getSlotLocalCoords(): { v: Vector3, q: Quaternion } {
    const v = this._dialogPlain.mesh.position.clone();
    const q = this._dialogPlain.mesh.quaternion;

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

}GainNode   