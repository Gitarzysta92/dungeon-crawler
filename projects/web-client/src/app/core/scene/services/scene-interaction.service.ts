import { Injectable } from "@angular/core";
import { filter, finalize, from, map, Observable, of, switchMap, tap, throwError } from "rxjs";
import { SceneService } from "./scene.service";
import { Rotatable } from "@3d-scene/lib/behaviors/rotatable/rotatable.mixin";
import { Intersection, Object3D, Vector2 } from "three";
import { getNormalizedCoordinates } from "@3d-scene/index";
import { ISceneMedium } from "../mixins/scene-medium/scene-medium.interface";
import { IActor } from "@3d-scene/lib/actors/actor.interface";
import { IBoardObjectRotation } from "@game-logic/lib/modules/board/board.interface";
import { IRotatable } from "@3d-scene/lib/behaviors/rotatable/rotatable.interface";
import { ControlsService } from "src/app/infrastructure/controls/controls.service";
import { IRawVector3 } from "@3d-scene/lib/extensions/types/raw-vector3";
import { PlainTile } from "@3d-scene/lib/actors/game-objects/tokens/plain-tile/plain-tile.game-object";


@Injectable()
export class SceneInteractionService {

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _controlsService: ControlsService
  ) {}

  public getDummy(sceneMedium: ISceneMedium): IActor & Partial<IRotatable> {
    return this._sceneService.components.previewComponent.preview ?? sceneMedium.associatedActors[0]
  }
  
  public showDummy(sceneMedium: ISceneMedium, position: IRawVector3, rotation: number): Promise<void> {
    return this._sceneService.components.previewComponent.show(sceneMedium.associatedActors[0], position, rotation as any)
  }

  public hideDummy(): void {
    this._sceneService.components.previewComponent.hide()
  }


  public clearIndicators() {
    this._sceneService.components.pathIndicator.hidePathIndicators()
  }

  public extractSceneMediumFromIntersection(is: Intersection<Object3D<Event> & IActor>[]): ISceneMedium[] {
    return is.filter(i => i.object).map(i => i.object.getUserData<any>(i.instanceId)?.getMediumRef());
  }


  public listenForSceneMediumSelection<T extends ISceneMedium>(): Observable<T[]> {
    const i$ = this._controlsService.listenForSelectEvent(this._sceneService.canvasRef);
    const v: any = new Vector2();
    return i$.pipe(
      map(e => this._sceneService.services.pointerHandler.intersect(getNormalizedCoordinates(e.clientX, e.clientY, v))),
      filter(is => is.length > 0),
      map(i => {
        return i.filter(r => !!r?.object?.getUserData<any>(r.instanceId)?.getMediumRef).map(r => r?.object?.getUserData<any>(r.instanceId)?.getMediumRef())
      }),
      filter(ms => ms.every(m => !!m))
    )
  }

  public requestSceneMediumSelection<T extends ISceneMedium>(
    predicate: (a: T | undefined) => boolean,
  ): Observable<T> {
    const i$ = this._controlsService.listenForSelectEvent(this._sceneService.canvasRef);
    const v: any = new Vector2();
    return i$.pipe(
      map(e => this._sceneService.services.pointerHandler.intersect(getNormalizedCoordinates(e.clientX, e.clientY, v))),
      switchMap(is => is.length === 0 ? throwError(() => new Error("Cannot find any objects for given intersection")) : of(is)),
      map(i => {
        return i.filter(r => !!r?.object?.getUserData<any>(r.instanceId)?.getMediumRef).map(r => r?.object?.getUserData<any>(r.instanceId)?.getMediumRef())
      }),
      switchMap(ms => !ms.some(m => !!m) ? throwError(() => new Error("Cannot find medium for intersected objects")) : of(ms)),
      map(ms => ms.find(m => predicate(m))));
  }

 
  public requestSelectRotation(
    m: IActor & Partial<IRotatable>,
  ): Observable<IBoardObjectRotation> {
    const select$ = this._controlsService.listenForSelectEvent(this._sceneService.canvasRef);
    const hover$ = this._controlsService.listenForHoverEvent(this._sceneService.canvasRef);

    const rotatableToken = Rotatable.validate(m);
    if (!rotatableToken) {
      throw new Error("Given token is not rotatable");
    }

    this._sceneService.components.rotateMenuComponent.showControls(rotatableToken, hover$ as any);
    return select$
      .pipe(
        switchMap(e => from(this._sceneService.components.rotateMenuComponent.rotateTile(e.x, e.y)) as Observable<IBoardObjectRotation>),
      );
  }

  public hideSelectRotationControl() {
    this._sceneService.components.rotateMenuComponent.hideControls()
  }



  public allowHovering(cb: (m: ISceneMedium) => boolean) {
    const hover$ = this._controlsService.listenForHoverEvent(this._sceneService.canvasRef);
    const p = this._sceneService.services.pointerHandler;
    this._sceneService.services.hoverDispatcher.startHoverListener(v => {
      return p.intersect(v).filter(i => {
        if (!i.object) {
          return false;
        }
        if (!i.object.getUserData()) {
          return false;
        }
        if (!i.object.getUserData<any>().getMediumRef) {
          return false;
        }
        return cb(i.object.getUserData<any>(i.instanceId)?.getMediumRef())
      })
    }, hover$ as any);
  }

  public settleHovering() {
    this._sceneService.components.hexagonGrid.settleHovering();
    this._sceneService.services.hoverDispatcher.finishHoverListener();
  }

}