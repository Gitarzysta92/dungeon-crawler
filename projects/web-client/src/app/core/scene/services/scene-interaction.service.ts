import { Injectable } from "@angular/core";
import { filter, finalize, first, from, map, Observable, of, switchMap, take, throwError } from "rxjs";
import { SceneService } from "./scene.service";
import { Rotatable } from "@3d-scene/lib/behaviors/rotatable/rotatable.mixin";
import { Intersection, Object3D, Vector2 } from "three";
import { getNormalizedCoordinates } from "@3d-scene/index";
import { ISceneMedium } from "../mixins/scene-medium/scene-medium.interface";
import { IActor } from "@3d-scene/lib/actors/actor.interface";
import { IBoardObjectRotation } from "@game-logic/lib/modules/board/board.interface";
import { IDataRequestResult } from "../../game/interfaces/data-request.interface";


@Injectable()
export class SceneInteractionService {

  constructor(
    private readonly _sceneService: SceneService,
  ) {}


  public clearIndicators() {
    this._sceneService.components.pathIndicator.hidePathIndicators()
  }

  public settleHovering() {
    this._sceneService.components.hexagonGrid.settleHovering()
  }

  public extractSceneMediumFromIntersection(is: Intersection<Object3D<Event> & IActor>[]): ISceneMedium[] {
    return is.filter(i => i.object).map(i => i.object.getUserData<any>(i.instanceId)?.getMediumRef());
  }

  public requestSceneMediumSelection<T extends ISceneMedium>(
    i$: Observable<PointerEvent>,
    predicate: (a: T | undefined) => boolean,
  ): Observable<IDataRequestResult<T>> {
    const v: any = new Vector2();
    const revertCb = () => { };
    return i$.pipe(
      map(e => this._sceneService.services.pointerHandler.intersect(getNormalizedCoordinates(e.clientX, e.clientY, v))),
      switchMap(is => is.length === 0 ? throwError(() => new Error("Cannot find any objects for given intersection")) : of(is) ),
      map(i => i.map(r => r?.object?.getUserData<any>(r.instanceId)?.getMediumRef())),
      switchMap(ms => ms.some(m => !m) ? throwError(() => new Error("Cannot find medium for intersected objects")) : of(ms) ),
      map(ms => {
        return { value: ms.find(m => predicate(m)), revertCb };
    }), take(1));
  }

 
  public requestSelectRotation(
    m: ISceneMedium,
    select$: Observable<PointerEvent>,
    hover$: Observable<PointerEvent>,
  ): Observable<IDataRequestResult<IBoardObjectRotation>> {
    if (m.rotation) {
      throw new Error("Provided medium does not have rotation value");
    }

    const aa = m.getAssociatedActors();
    if (aa.length <= 0) {
      throw new Error("Provided medium does not have associated scene objects")
    }
    const token = aa[0];    
    const rotatableToken = Rotatable.validate(token);
    if (!rotatableToken) {
      throw new Error("Given token is not rotatable");
    }

    this._sceneService.components.rotateMenuComponent.showControls(rotatableToken, hover$ as any);
    const revertCb = () => { };
    return select$
      .pipe(
        switchMap(e => from(this._sceneService.components.rotateMenuComponent.rotateTile(e.x, e.y))),
        take(1),
        map(r => {
          return { value: r as IBoardObjectRotation, revertCb } 
        }),
        finalize(() => this._sceneService.components.rotateMenuComponent.hideControls())
      );
  }

}