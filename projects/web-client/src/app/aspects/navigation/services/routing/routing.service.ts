import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AreaType } from '@game-logic/lib/features/adventure/area.constants';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  
  public onNavigationStart: Observable<NavigationStart>;
  public onNavigationEnd: Observable<NavigationEnd>;
  parameters: any;

  constructor(
    private _router: Router,
    private route: ActivatedRoute

  ) { 
    this.onNavigationStart = this._router.events
      .pipe(filter(event => event instanceof NavigationStart)) as any;

    this.onNavigationEnd = this._router.events
      .pipe(filter(event => event instanceof NavigationEnd)) as any;

    this.parameters = this.route.params;
  }

  public navigateToArea(areaType: AreaType, id: string) {
    if (areaType === AreaType.Dungeon) {
      this._router.navigate(['/game/adventure/dungeon/', id]);
    } else if (areaType === AreaType.Town) {
      this._router.navigate(['/game/adventure/town/', id]);
    } else if (areaType === AreaType.Building) {
      this._router.navigate(['/game/adventure/town/building/', id]);
    }
  }

  public navigateToGameCreator() {
    this._router.navigate(['game-creator/creator']);
  }

  public navigateToGameLoader() {
    this._router.navigate(['game-creator/loader']);
  }

  public navigateToGame(): void {
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
