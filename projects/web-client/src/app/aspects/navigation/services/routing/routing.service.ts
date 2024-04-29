import { Injectable } from '@angular/core';
import { ActivatedRoute, Navigation, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  
  public onNavigationStart: Observable<RoutesRecognized & Navigation>;
  public onNavigationEnd: Observable<NavigationEnd & Navigation>;
  parameters: any;

  constructor(
    private _router: Router,
    private route: ActivatedRoute

  ) { 
    this.onNavigationStart = this._router.events
      .pipe(
        filter(event => event instanceof RoutesRecognized),
        map(x =>  Object.assign({...x} as RoutesRecognized, this._router.getCurrentNavigation()))
      )

    this.onNavigationEnd = this._router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(x => Object.assign({...x} as NavigationEnd, this._router.getCurrentNavigation()))
      )

    this.parameters = this.route.params;
  }

  public navigateToArea(areaType: any, id: string) {
    // if (areaType === AreaType.Dungeon) {
    //   this._router.navigate(['/game/adventure/dungeon/', id]);
    // } else if (areaType === AreaType.Town) {
    //   this._router.navigate(['/game/adventure/town/', id]);
    // } else if (areaType === AreaType.Building) {
    //   this._router.navigate(['/game/adventure/town/building/', id]);
    // }
  }

  public navigateToGameBuilder() {
    this._router.navigate(['game-builder'], { state: { showLoader: false } });
  }

  public navigateToGameLoader() {
    this._router.navigate(['game-creator/loader']);
  }

  public navigateToGame(savedGameId: string): void {
    this._router.navigate(['/game/adventure']);
  }

  public navigateToMainMenu(): void {
    this._router.navigate(['/']);
  }

  public navigateToDungeonInstance(id: string) {
    this._router.navigate(['/game/dungeon', id])
  }

  public nagivateToDungeonSummary(id: string) {
    this._router.navigate(['/game/dungeon/summary', id])
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
  



  navigateToLobby() {
    this._routerNavigate(['/lobby'])
  }

  nagivateToLogin() {
    this._router.navigate(['/account/log-in']);
  }

  navigateToRegistration() {
    this._router.navigate(['/account/register']);
  }

  navigateToPasswordRecovery() {
    this._router.navigate(['/account/recovery']);
  }

  navigateToMyProfile() {
    this._router.navigate(['/profile/me']);
  }


  navigateToHotseatGame(id: string): void {
    this._router.navigate(['/game/dungeon', id]);
  }

  navigateToNotifications(): void {
    this._routerNavigate(['/notifications'])
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
