import { Vector3 } from "three";
import { TileObject } from "../../actors/game-objects/tile.game-object";



export interface TilesRowPosition {
  tile: TileObject,
  coords: Vector3
} 

export class TilesRowComponent {

  public span: number = 10;
  public tiles: Map<TileObject, TileObject> = new Map();

  constructor() { }

  public assignTile(tile: TileObject): void {
    this.tiles.set(tile, tile);
    tile.mesh.position.set(0, 0, -100);
    this._setCoordsForTiles();
  }

  public unassignTile(tile: TileObject): void {
    this.tiles.delete(tile);
    this._setCoordsForTiles();
  }

  public softTileAssign(tile: TileObject): TilesRowPosition[] {
    this.tiles.set(tile, tile);
    return this._getCoordsForTiles();
  }

  public isEmpty(): boolean {
    return this.tiles.size === 0;
  }

  public clear() {
    this.tiles.clear();
  }

  public has(tile: TileObject): boolean {
    return this.tiles.has(tile);
  }

  private _setCoordsForTiles(): void {
    const positions = this._getCoordsForTiles();
    positions.forEach(p => {
      p.tile.mesh.position.setX(p.coords.x);
    })
  }
  
  private _getCoordsForTiles(): TilesRowPosition[] {
    const positions: TilesRowPosition[] = [];
    const l = this.tiles.size;
    const shift = !!(l % 2) ? l / 3 : l / 4;
    let i = 0;
    this.tiles.forEach(t => {
      const result = { tile: t, coords: t.mesh.position.clone() }
      if (l === 1) {
        result.coords.setX(0);
      } else {
        result.coords.setX((i - shift) * this.span);
      }
      positions.push(result);
      i++;
    });
    return positions;
  }

}