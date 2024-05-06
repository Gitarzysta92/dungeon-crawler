import { Injectable } from '@angular/core';
import { ActivatedRoute, Navigation, NavigationBehaviorOptions, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  
  public onNavigationStart: Observable<{ event: RoutesRecognized, navigation: Navigation}>;
  public onNavigationEnd: Observable<{ event: NavigationEnd, navigation: Navigation}>;
  parameters: any;

  constructor(
    private _router: Router,
    private route: ActivatedRoute

  ) { 
    this.onNavigationStart = this._router.events
      .pipe(
        filter(event => event instanceof RoutesRecognized),
        map(x => ({ event: x as RoutesRecognized, navigation: this._router.getCurrentNavigation() }))
      )

    this.onNavigationEnd = this._router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(x => ({ event: x as NavigationEnd, navigation: this._router.getCurrentNavigation() }))
      )

    this.parameters = this.route.params;
  }

  public navigateToGameBuilder() {
    this._router.navigate(['game-builder']);
  }

  public navigateToGame(): void {
    this._router.navigate(['/game']);
  }

  public navigateToMainMenu(): void {
    this._router.navigate(['/']);
  }

  public navigateToDevelopment(): void {
    this._router.navigate(['development']);
  }

  public navigateToDungeonPlayground(): void {
    this._router.navigate(['development/dungeon']);
  }

  public navigateToTileRotationDev() {
    this._router.navigate(['development/dungeon/tile-rotation-dev']);
  }

  public navigateToBoardSelectorDev() {
    this._router.navigate(['development/dungeon/board-selector-dev']);
  }
  
  public nav(fragments: string[], activatedRoute: ActivatedRoute): void {
    this._router.navigate(fragments, { relativeTo: activatedRoute });
  }

  public navWithExtras(fragments: string[], activatedRoute: ActivatedRoute, extras: any = {}): void {
    this._router.navigate(fragments, { relativeTo: activatedRoute, ...extras });
  }



  public navigate(fragments: string[], extras?: NavigationBehaviorOptions): void {
    const serializedFragments = fragments.reduce((acc, fragment) => `${acc}/${fragment}`, "");

    const isAbsolute = serializedFragments.charAt(0) === '/';
    const url = isAbsolute ? serializedFragments : (this._router.url + serializedFragments);

    const urlTree = this._router.parseUrl(url);
    this._router.navigateByUrl(urlTree, extras);
  }

  private _routerNavigate(fragments: string[], query?: { [key: string] : string | number} ): void {
    this._router.navigate(fragments, { queryParams: query })
  }

}
