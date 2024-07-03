import { Injectable } from "@angular/core";
import { RoutingService } from "../api";
import { Observable, Subscription, concat, delayWhen, first, map, of, switchMap, timer } from "rxjs";
import { RouterStateSnapshot, ActivatedRouteSnapshot, RoutesRecognized } from "@angular/router";
import { Overlay, OverlayPositionBuilder } from "@angular/cdk/overlay";
import { ComponentPortal, ComponentType } from "@angular/cdk/portal";

@Injectable({
  providedIn: 'root'
})
export class NavigationLoadingScreenService {

  constructor(
    private readonly _routingService: RoutingService,
    private readonly _overlayService: Overlay,
    private readonly _positionBuilder: OverlayPositionBuilder
  ) { }
  
  public handleNavigation(loaderName: string, component: ComponentType<unknown>, delayTime?: number): Subscription {
    const position = this._positionBuilder.global();
    const overlayRef = this._overlayService.create({
      positionStrategy: position,
      panelClass: "loader-class",
      disposeOnNavigation: false,
      hasBackdrop: false,
      width: '100vw',
      height:  '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
    });
    const p = new ComponentPortal(component);

    return this.listenForLoaderIndicator(loaderName, delayTime)
      .subscribe(s => {
        s && !overlayRef.hasAttached() ? overlayRef.attach(p) : overlayRef.detach();
      })
  }

  public listenForLoaderIndicator(loaderName: string, delayTime: number = 3000): Observable<boolean> {
    return this._routingService.onNavigationStart$
      .pipe(
        map(n => {
          const data = this._extractRouteDataFromSnapshot(loaderName, (n.event as RoutesRecognized).state);

          console.log(n.navigation.previousNavigation?.finalUrl?.toString(), data?.url?.toString(), loaderName)

          return !!data?.url?.toString() && !n.navigation.previousNavigation?.finalUrl?.toString().includes(data?.url?.toString())
        }),
        switchMap(v =>
          concat(
            of(v),
            this._routingService.onNavigationEnd$
              .pipe(
                first(),
                map(() => false),
                delayWhen(sv => timer(v && !sv ? delayTime : 0))
              )
          )
        )
      );
  }

  private _extractRouteDataFromSnapshot(loaderName: string, state: RouterStateSnapshot): ActivatedRouteSnapshot {
    let data: ActivatedRouteSnapshot = null;
    function extractDataFromRoute(route: ActivatedRouteSnapshot): void {
      if (!route) {
        return;
      }
      if (route.data.loaderName === loaderName) {
        data = route
      }
      if (!data) {
        route.children.forEach(r => extractDataFromRoute(r))
      }
    }
    extractDataFromRoute(state.root)
    return data;
  }
}
