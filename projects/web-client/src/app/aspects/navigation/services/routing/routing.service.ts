import { Injectable } from '@angular/core';
import { ActivatedRoute, Navigation, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';


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
  
  nav(fragments: string[], activatedRoute: ActivatedRoute): void {
    this._router.navigate(fragments, {relativeTo: activatedRoute});
  }

  navigate(fragments: string[]): void {
    const serializedFragments = fragments.reduce((acc, fragment) => `${acc}/${fragment}`, "");

    const isAbsolute = serializedFragments.charAt(0) === '/';
    const url = isAbsolute ? serializedFragments : (this._router.url + serializedFragments);

    const urlTree = this._router.parseUrl(url);
    this._router.navigateByUrl(urlTree);
  }

  private _routerNavigate(fragments: string[], query?: { [key: string] : string | number} ): void {
    this._router.navigate(fragments, { queryParams: query })
  }

}
