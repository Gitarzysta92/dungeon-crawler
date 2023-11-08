import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { ProgressionCreatorService } from '../../services/progression-creator/progression-creator.service';
import { PersistedGameProgressionService } from '../../services/persisted-game-progression/persisted-game-progression.service';
import { IPersistedGameProgression } from '../../interfaces/persisted-game-progression.interface';

@Component({
  selector: 'game-loader',
  templateUrl: './game-loader.component.html',
  styleUrls: ['./game-loader.component.scss']
})
export class GameLoaderComponent implements OnInit {

  public progressions: IPersistedGameProgression[] = [];
  public selectedProgression: IPersistedGameProgression;
  
  constructor(
    private readonly _gameCreatorService: ProgressionCreatorService,
    private readonly _routingService: RoutingService,
    private readonly _persistedGameProgressionService: PersistedGameProgressionService
  ) { }

  async ngOnInit(): Promise<void> {
    await this._getProgressions();
  }

  public selectProgression(progression: IPersistedGameProgression): void {
    this.selectedProgression = progression;
  }

  public async removeProgression(progression: IPersistedGameProgression): Promise<void> {
    await this._persistedGameProgressionService.removeProgression(progression);
    this._getProgressions();
  }
  
  public async loadProgression(): Promise<void> {
    if (!this.selectedProgression) {
      return;
    }

    this._persistedGameProgressionService.loadProgression(this.selectedProgression);
    this._routingService.navigateToGame();
  }

  public backToMainMenu(): void {
    this._routingService.navigateToMainMenu();
  }

  private async _getProgressions(): Promise<void> {
    const progressions = [];
    const currentProgression = await this._persistedGameProgressionService.getCurrentProgression();
    if (currentProgression) {
      progressions.push(currentProgression);
    }

    const persistedProgressions = await this._persistedGameProgressionService.getPersistedProgressions();
    this.progressions = progressions.concat(persistedProgressions);
  }

}
