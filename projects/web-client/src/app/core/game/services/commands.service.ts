import { Injectable } from '@angular/core';
import { SceneService } from '../../scene/services/scene.service';
import { Observable, catchError, filter, first, firstValueFrom, iif, map, of, race, switchMap, tap } from 'rxjs';
import { UiService } from '../../game-ui/services/ui.service';
import { IActivitySubject } from '@game-logic/lib/base/activity/activity.interface';
import { ICommand } from '../interfaces/command.interface';
import { SuggestionService } from './suggestion.service';
import { IGame } from '../interfaces/game.interface';
import { SettingsStore } from '../../settings/stores/settings.store';
import { IInteractableMedium } from '../../game-ui/mixins/interactable-medium/interactable-medium.interface';
import { IGameStore } from '../interfaces/game-store.interface';


@Injectable()
export class CommandsService {

  public currentProcess: CommandExecutionProcess | undefined;

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _uiService: UiService,
    private readonly _suggestionService: SuggestionService,
    private readonly _settingsStore: SettingsStore
  ) { }

  public async tryExecuteCommand(gameStore: IGameStore, possibleCommands: ICommand[]): Promise<void> {
    this.createExecutionProcess(gameStore, possibleCommands);
    const isConfirmed = await this.currentProcess.requestCommandSelection();
    if (isConfirmed) {
      await this.currentProcess.executeCommand();
    }
    this.finalizeExecutionProcess();
  }


  public async executeCommand(gameStore: IGameStore, command: ICommand): Promise<void> {
    this.createExecutionProcess(gameStore, [command]);
    const isConfirmed = this.currentProcess.select(command);
    if (isConfirmed) {
      await this.currentProcess.executeCommand();
    }
    this.finalizeExecutionProcess();
  }


  public async createExecutionProcess(gameStore: IGameStore, commands: ICommand[]): Promise<void> {
    if (this.currentProcess) {
      this.currentProcess.finalize();
      this.currentProcess = undefined;
    }
    this.currentProcess = new CommandExecutionProcess(
      this._sceneService,
      this._uiService,
      this._suggestionService,
      this._settingsStore,
      commands,
      gameStore
    )
  }
  
  public finalizeExecutionProcess() {
    this.currentProcess?.finalize();
    this.currentProcess = undefined;
  }

  public areAvailableCommands(gameState: IGame): boolean {
    return gameState.getAvailableActivities(gameState.getSelectedPawn()).length > 0;
  }

  public getAvailableCommands(gameState: IGame): Array<ICommand> {
    return gameState.getAvailableActivities(gameState.getSelectedPawn());
  }
}


export class CommandExecutionProcess {

  public isConfirmed: boolean
  public selectedCommand: ICommand;

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _uiService: UiService,
    private readonly _suggestionService: SuggestionService,
    private readonly _settingsStore: SettingsStore,
    private readonly _availableCommands: Array<ICommand>,
    private readonly _gameStore: IGameStore,
  ) { }
  
  public executeCommand(): Promise<void> {
    if (!this.isConfirmed) {
      return;
    }
    if (!this.selectedCommand) {
      throw new Error("Command not selected");
    }
    return this.selectedCommand.execute(this._gameStore);
  }

  public finalize(): void {
    this._sceneService.clearIndicators()
    this._suggestionService.hideCommandSuggestions(this._availableCommands as any);
  }

  public select(command: ICommand): boolean {
    this.selectedCommand = command;
    return this.isConfirmed = true;
  }

  public requestCommandSelection(): Promise<boolean> {
    this._suggestionService.showCommandSuggestions(this._availableCommands as any);
    return firstValueFrom(race([
        this._sceneService.requestSceneMediumSelection<IActivitySubject>()
          .pipe(filter(r => r.isActivitySubject && r.activities.some(a => this._availableCommands.includes(a as any))), first()),
        this._uiService.requestUiMediumSelection<IActivitySubject>().pipe(filter(r => r.isActivitySubject), first())
      ])
      .pipe(
        filter(() => this._settingsStore.currentState.interface.isInteractionAllowed),
        filter(r => r.activities.some(a => this._availableCommands.some(c => c.id === a.id))),
        tap(() => this._suggestionService.hideCommandSuggestions(this._availableCommands as any)),
        switchMap(r => iif(
          () => r.activities.length === 0,
          of(r.activities[0] as ICommand),
          this._uiService.requestCommandSelection(r.activities as ICommand[])
        )),
        tap((command: ICommand & IInteractableMedium) => {
          this.selectedCommand = command;
          command.indicate(this._gameStore);
          this._sceneService.settleHovering();
        }),
        switchMap(command => this._uiService.requestConfirmation<ICommand>(command)),
        catchError(err => {
          console.error(err);
          this._sceneService.clearIndicators()
          return of(false)
        }),
        tap((confirmed: boolean) => {
          this.isConfirmed = confirmed;
          this._sceneService.clearIndicators();
        })
      ))
  }
}