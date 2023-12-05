import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { ProjectDataService } from '../../services/project-data.service';
import { ExternalLinkService } from 'src/app/aspects/navigation/services/external-link.service';
import { PersistedGameProgressionService } from 'src/app/core/game-progression/services/persisted-game-progression/persisted-game-progression.service';
import { IPersistedGameProgression } from 'src/app/core/game-progression/interfaces/persisted-game-progression.interface';

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
  public isPersistedProgression: IPersistedGameProgression;

  constructor(
    private readonly _routingService: RoutingService,
    private readonly _projectData: ProjectDataService,
    private readonly _externalLinkService: ExternalLinkService,
    private readonly _persistedProgressionService: PersistedGameProgressionService
  ) { }

  async ngOnInit(): Promise<void> {
    const { versionName, semanticVersion } = await firstValueFrom(this._projectData.getProjectVersion())
    this.versionName = versionName;
    this.semanticVersion = semanticVersion;

    this.isPersistedProgression = await this._persistedProgressionService.getCurrentProgression();
  }

  public startGame() {
    this._routingService.navigateToGame()
  }

  public openLink(url: string): void {
    this._externalLinkService.openExternalLink(url);
  }

  public navigateToGame(): void {
    this._routingService.navigateToGame();
  }

  public navigateToGameCreator(): void {
    this._routingService.navigateToGameCreator();
  }

  public navigateToGameLoader(): void {
    this._routingService.navigateToGameLoader();
  }

  public navigateToDevelopment(): void {
    this._routingService.navigateToDevelopment();
  }

}
