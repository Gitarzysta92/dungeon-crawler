import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Menu, MenuItem, MenuLocation, MenuService, RoutingService } from 'src/app/aspects/navigation/api';
import { ExternalLinkService } from 'src/app/aspects/navigation/services/external-link.service';
import { GameSavesStore } from 'src/app/core/game-persistence/stores/game-saves.store';
import { ConfigurationService } from 'src/app/infrastructure/configuration/api';

@Component({
  selector: 'main-menu-view',
  templateUrl: './main-menu-view.component.html',
  styleUrls: ['./main-menu-view.component.scss']
})
export class MainMenuViewComponent implements OnInit {

  public versionName: string = '';
  public semanticVersion: string = '';

  public socials: { iconName: string, link: string }[] = [
    { iconName: "kickstarter", link: "" }
  ]
  public selectedGameSaveId: any;
  public menuData$: Observable<Menu>;

  constructor(
    private readonly _configurationService: ConfigurationService,
    private readonly _externalLinkService: ExternalLinkService,
    private readonly _gamesStateStore: GameSavesStore,
    private readonly _menuService: MenuService,
    private readonly _routingService: RoutingService
  ) { }

  async ngOnInit(): Promise<void> {
    this.versionName = this._configurationService.versionName;
    this.semanticVersion = this._configurationService.version;
    this.selectedGameSaveId = this._gamesStateStore.state$.pipe(map(s => s.selectedGameSaveId));
    this.menuData$ = this._menuService.getMenuData(MenuLocation.MainMenu)
      .pipe(map(p => {

        return p;
      }));
  }

  public openLink(url: string): void {
    this._externalLinkService.openExternalLink(url);
  }

  public navigate(item: MenuItem): void {
    this._routingService.navigate(item.fragments);
  }

  // public startGame() {
  //   //this._routingService.navigateToGame()
  // }

  // public navigateToGame(savedGameId: string): void {
  //   this._routingService.navigateToGame(savedGameId);
  // }

  // public navigateToGameCreator(): void {
  //   this._routingService.navigateToGameBuilder();
  // }

  // public navigateToGameLoader(): void {
  //   this._routingService.navigateToGameLoader();
  // }

  // public navigateToDevelopment(): void {
  //   this._routingService.navigateToDevelopment();
  // }

}
