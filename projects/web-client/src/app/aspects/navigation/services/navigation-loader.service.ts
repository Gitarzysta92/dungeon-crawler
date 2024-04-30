import { Injectable } from "@angular/core";
import { RoutingService } from "../api";
import { Observable, concat, delayWhen, first, map, of, switchMap, timer } from "rxjs";
import { RouterStateSnapshot, ActivatedRouteSnapshot, RoutesRecognized } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavigationLoaderService {

  constructor(
    private readonly _routingService: RoutingService,
  ) {}

  public listenForLoaderIndicator(delayTime: number = 3000): Observable<boolean> {
    return this._routingService.onNavigationStart
      .pipe(
        map(n => {
          const data = this._extractRouteDataFromSnapshot((n.event as RoutesRecognized).state);
          const prev = n.navigation.previousNavigation?.finalUrl?.toString();
          const tUrl = n.event.url?.split("/")
          const hasSameSegment = prev?.split("/").some(s => tUrl.find(t => t === s))
          const showCondition = !data.loader?.skipWhenSameBranch || !hasSameSegment || !prev;
          return !!(data.loader && data.loader.show && showCondition);
        }),
        switchMap(v =>
          concat(
            of(v),
            this._routingService.onNavigationEnd
              .pipe(
                first(),
                map(() => false),
                delayWhen(sv => timer(v && !sv ? delayTime : 0))
              )
          )
        )
      );
  }

  private _extractRouteDataFromSnapshot(state: RouterStateSnapshot): any {
    let data = {};
    function extractDataFromRoute(route: ActivatedRouteSnapshot): void {
      if (route) {
        if (route.data) {
          Object.assign(data, route.data);
        }
        route.children.forEach(childRoute => extractDataFromRoute(childRoute));
      }
    }
    extractDataFromRoute(state.root);
    return data;
  }
}
