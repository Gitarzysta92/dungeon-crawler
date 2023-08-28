import { map, fromEvent } from "rxjs";
import { Quaternion, Vector2, Vector3 } from "three";
import { TileObject } from "../actors/game-objects/tile.game-object";
import { AnimationDispatcher } from "../behaviours/animations/animation.dispatcher";
import { CollisionDispatcher } from "../behaviours/collision/collision.dispatcher";
import { DragDispatcher } from "../behaviours/drag/drag.dispatcher";
import { HoverDispatcher } from "../behaviours/hover/hover.dispatcher";
import { SelectionDispatcher } from "../behaviours/select/selection.dispatcher";
import { View } from "../internals/scene/view";
import { getNormalizedMouseCoordinates2 } from "../utils/utils";

export abstract class BaseComponent {
  boundries: any;
  mousemove$: any;

  constructor(
    protected readonly gameView: View,
    protected readonly selectionDispatcher: SelectionDispatcher,
    protected readonly animationDispatcher: AnimationDispatcher,
    protected readonly dragDispatcher: DragDispatcher,
    protected readonly collisionDispatcher: CollisionDispatcher,
    protected readonly hoverDispatcher: HoverDispatcher
  ) { 
    //this.mousemove$ = this.listenForMousemove();
  }

  // public selectTile(x: number, y: number): TileObject {
  //   const o = this.getTargetedTile(x, y);
  //   this.selectionDispatcher.select(o);
  //   return o;
  // }


  // public getTargetedTile(x: number, y: number): TileObject {
  //   const mc = new Vector2();
  //   const o = this.gameView.intersect(getNormalizedMouseCoordinates2(x, y, mc))
  //     .find(i => i.object instanceof TileObject)?.object as any;
  //   return o;
  // }

  public getDraggedTile(): TileObject {
    return this.dragDispatcher.currentObject;
  }

  public stopDraging() {
    const tile = this.dragDispatcher.currentObject;
    this.collisionDispatcher.stopColliding(tile);
    this.dragDispatcher.stopDragging();
  }

  // protected getTile(tileId: any): TileObject | undefined {
  //   const obj = this.gameView.gameObjects as unknown as TileObject[];
  //   return Object.values(obj).find(o => o.auxId === tileId);
  // }

  // protected async createToken(img: string, id: string) {
  //   const camera = this.gameView['_camera'];

  //   const ddd = new Vector3();
  //   camera.getWorldPosition(ddd);

  //   var forward = new Vector3(0, 1, 0);
  //   var right = ddd.clone().cross(forward).normalize();
  //   const d = new Quaternion().setFromAxisAngle(right, -0.85);

  //   let asd = camera.position.clone();
  //   asd.multiplyScalar(0.5)

  //   const token = ObjectFactory.createTile(img, asd, g, id);

  //   this.gameView.attach(token);
  //   token.mesh.applyQuaternion(d);

    
  //   const gg = new Quaternion().setFromAxisAngle(new Vector3(0,3,0).normalize(),-0.4)
  //   const h = new Quaternion().setFromAxisAngle(right, 0.02);
  //   const xx = gg.multiply(h);

  //   await this.animationDispatcher.transition(token, this.mousemove$, xx);

  //   this.dragDispatcher.startDragging(token);
  // }

  protected removeToken(token: TileObject) {
    token.destroy();
  }

  // protected listenForMousemove() {
  //   const mc = new Vector2();
  //   const o = new Vector3(0,5,0);
  //   return fromEvent<MouseEvent>(window, 'mousemove')  
  //     .pipe(map((e: MouseEvent) => {
  //       const found = this.gameView.intersect(getNormalizedMouseCoordinates2(e.clientX, e.clientY, mc))
  //         .filter(x => x.object instanceof PassiveObject)[0];
  //       o.setX(found?.point?.x || o.x);
  //       o.setZ(found?.point?.z || o.z);
  //       return o;
  //     }));
  // }

  abstract initializeGuiObjects(): void
}







// protected toggle(tile: TileObject) {
//   if (this.gameView.camera.getObjectById(tile.mesh.id)) {
//     const initialCoords = new Vector3();
//     const initialQuaternion = new Quaternion();
//     tile.mesh.getWorldPosition(initialCoords);
//     tile.mesh.getWorldQuaternion(initialQuaternion);
//     tile.mesh.removeFromParent();
//     this.gameView['_scene'].add(tile.mesh);
//     tile.mesh.position.set(initialCoords.x, initialCoords.y, initialCoords.z);
//     tile.mesh.applyQuaternion(initialQuaternion);
//   } else {
    
//   }
// }