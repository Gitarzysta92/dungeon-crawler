import { Injectable } from '@angular/core';
import { SceneService } from '../../scene/services/scene.service';
import { filter, firstValueFrom, iif, of, race, switchMap, tap } from 'rxjs';
import { UiService } from '../../game-ui/services/ui.service';
import { IActivitySubject } from '@game-logic/lib/base/activity/activity.interface';
import { ICommand } from '../interfaces/command.interface';
import { SuggestionService } from './suggestion.service';
import { IHero } from '@game-logic/gameplay/modules/heroes/mixins/hero/hero.interface';
import { IGame } from '../interfaces/game.interface';


@Injectable()
export class InteractionService {
  
  constructor(
    private readonly _sceneService: SceneService,
    private readonly _uiService: UiService,
    private readonly _suggestionService: SuggestionService
  ) { }
  
  public async requestCommandSelection(gameState: IGame, hero: IHero): Promise<ICommand> {
    this._sceneService.clearIndicators()
    const availableCommands = gameState.getAvailableActivities(hero);
    this._suggestionService.displaySuggestions(availableCommands);

    const selection = firstValueFrom(race([
      this._sceneService.requestSceneMediumSelection<IActivitySubject>().pipe(filter(r => r.isActivitySubject)),
      this._uiService.requestUiMediumSelection<IActivitySubject>().pipe(filter(r => r.isActivitySubject))
    ]).pipe(
      tap(() => this._suggestionService.hideSuggestions(availableCommands)),
      switchMap(r => iif(
        () => r.activities.length <= 0,
        of(r.activities[0] as ICommand),
        this._uiService.requestCommandSelection(r.activities as ICommand[])
      )),
      tap(command => command.indicate(gameState.getSelectedPawn())),
      switchMap(command => this._uiService.requestSelectionConfirmation<ICommand>(command)),
    ))
    
    return selection;
  }

  public areAvailableCommands(gameState: IGame, hero: IHero): boolean {
    return gameState.getAvailableActivities(hero).length > 0;
  }

}