import { Injectable } from '@angular/core';
import { SceneService } from '../../scene/services/scene.service';
import { catchError, filter, firstValueFrom, iif, map, of, race, switchMap, tap } from 'rxjs';
import { UiService } from '../../game-ui/services/ui.service';
import { IActivitySubject } from '@game-logic/lib/base/activity/activity.interface';
import { ICommand } from '../interfaces/command.interface';
import { SuggestionService } from './suggestion.service';
import { IGame } from '../interfaces/game.interface';
import { SettingsStore } from '../../settings/stores/settings.store';
import { IInteractableMedium } from '../../game-ui/mixins/interactable-medium/interactable-medium.interface';


@Injectable()
export class InteractionService {
  
  constructor(
    private readonly _sceneService: SceneService,
    private readonly _uiService: UiService,
    private readonly _suggestionService: SuggestionService,
    private readonly _settingsStore: SettingsStore
  ) { }
  
  public async requestCommandSelection(
    gameState: IGame,
    availableCommands: Array<ICommand & IInteractableMedium>
  ): Promise<{ confirmed: boolean, command: ICommand }> {
    this._sceneService.clearIndicators()
    this._suggestionService.displaySuggestions(availableCommands);

    const selection = firstValueFrom(race([
      this._sceneService.requestSceneMediumSelection<IActivitySubject>().pipe(filter(r => r.isActivitySubject)),
      this._uiService.requestUiMediumSelection<IActivitySubject>().pipe(filter(r => r.isActivitySubject))
    ]).pipe(
      filter(() => this._settingsStore.currentState.interface.isInteractionAllowed),
      filter(r => r.activities.some(a => availableCommands.some(c => c.id === a.id))),
      tap(() => this._suggestionService.hideSuggestions(availableCommands)),
      switchMap(r => iif(
        () => r.activities.length <= 0,
        of(r.activities[0] as ICommand),
        this._uiService.requestCommandSelection(r.activities as ICommand[])
      )),
      tap(command => command.indicate(gameState)),
      switchMap(command => this._uiService.requestConfirmation<ICommand>().pipe(map(c => ({ confirmed: c, command })))),
      catchError(() => {
        this._sceneService.clearIndicators()
        return of({ confirmed: false, command: undefined })
      }),
      tap(r => {
        if (!r.confirmed) {
          this._sceneService.clearIndicators();
        }
      })
    ))
    
    return selection;
  }

  public areAvailableCommands(gameState: IGame): boolean {
    return gameState.getAvailableActivities(gameState.getSelectedPawn()).length > 0;
  }

  public getAvailableCommands(gameState: IGame): Array<ICommand & IInteractableMedium> {
    return gameState.getAvailableActivities(gameState.getSelectedPawn());
  }

}