import { Injectable } from '@angular/core';
import { SceneService } from '../../scene/services/scene.service';
import { BehaviorSubject, Subject, catchError, defaultIfEmpty, filter, firstValueFrom, iif, of, race, switchMap, takeUntil, tap } from 'rxjs';
import { UiService } from '../../game-ui/services/ui.service';
import { IActivitySubject } from '@game-logic/lib/base/activity/activity.interface';
import { ICommand } from '../interfaces/command.interface';
import { SuggestionService } from './suggestion.service';
import { IGame } from '../interfaces/game.interface';
import { SettingsStore } from '../../settings/stores/settings.store';
import { IInteractableMedium } from '../../game-ui/mixins/interactable-medium/interactable-medium.interface';
import { IGameStore } from '../interfaces/game-store.interface';
import { SceneInteractionService } from '../../scene/api';
import { ControlsService } from 'src/app/infrastructure/controls/controls.service';
import { ISceneMedium } from '../../scene/mixins/scene-medium/scene-medium.interface';


@Injectable()
export class CommandsService {

  public get currentProcess() { return this.processing$.value };
  public processing$: BehaviorSubject<CommandExecutionProcess | null> = new BehaviorSubject(null);

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _sceneInteractionService: SceneInteractionService,
    private readonly _controlsService: ControlsService,
    private readonly _uiService: UiService,
    private readonly _suggestionService: SuggestionService,
    private readonly _settingsStore: SettingsStore,
  ) { }

  public async tryExecuteCommand(
    gameStore: IGameStore,
    availableCommands: ICommand[],
    context?: unknown
  ): Promise<void> {
    this.createExecutionProcess(gameStore, availableCommands, context);
    const isConfirmed = await this.currentProcess.requestCommandSelection();
    if (isConfirmed) {
      await this.currentProcess.executeCommand();
    }
    this.finalizeExecutionProcess();
  }


  public async executeCommand(
    gameStore: IGameStore,
    availableCommands: ICommand,
    context?: unknown
  ): Promise<void> {
    this.createExecutionProcess(gameStore, [availableCommands], context);
    const isConfirmed = this.currentProcess.select(availableCommands);
    if (isConfirmed) {
      await this.currentProcess.executeCommand();
    }
    this.finalizeExecutionProcess();
  }


  public async createExecutionProcess(
    gameStore: IGameStore,
    availableCommands: ICommand[],
    context?: unknown
  ): Promise<void> {
    if (this.currentProcess) {
      this.currentProcess.finalize();
    }
    this.processing$.next(new CommandExecutionProcess(
      this._sceneService,
      this._sceneInteractionService,
      this._controlsService,
      this._uiService,
      this._suggestionService,
      this._settingsStore,
      availableCommands,
      gameStore,
      context
    ))
  }
  
  public finalizeExecutionProcess() {
    this.currentProcess?.finalize();
    this.processing$.next(null);
  }

  public areAvailableCommands(gameState: IGame): boolean {
    return gameState.getAvailableActivities(gameState.getCurrentPlayerSelectedPawn()).length > 0;
  }

  public getAvailableCommands(gameState: IGame): Array<ICommand> {
    return gameState.getAvailableActivities(gameState.getCurrentPlayerSelectedPawn());
  }
}


export class CommandExecutionProcess {

  public isExecuting: boolean = false;
  public isConfirmed: boolean
  public selectedCommand: ICommand;
  private _finalize: Subject<void> = new Subject();

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _sceneInteractionService: SceneInteractionService,
    private readonly _controlsService: ControlsService,
    private readonly _uiService: UiService,
    private readonly _suggestionService: SuggestionService,
    private readonly _settingsStore: SettingsStore,
    private readonly _availableCommands: Array<ICommand>,
    private readonly _gameStore: IGameStore,
    private readonly _commandContext: unknown
  ) { }

  public hasCommand(c: ICommand): boolean {
    return this.selectedCommand === c || this._availableCommands.some(ac => ac === c);
  }
  
  public executeCommand(): Promise<void> {
    if (!this.isConfirmed) {
      return;
    }
    if (!this.selectedCommand) {
      throw new Error("Command not selected");
    }
    this.isExecuting = true;
    return this.selectedCommand.execute(this._gameStore, this._commandContext);
  }

  public finalize(): void {
    this.isExecuting = false;
    this._finalize.next();
    this._sceneInteractionService.clearIndicators()
    this._suggestionService.hideCommandSuggestions(this._availableCommands as any);
  }

  public select(command: ICommand): boolean {
    this.selectedCommand = command;
    return this.isConfirmed = true;
  }

  public requestCommandSelection(): Promise<boolean> {
    this._suggestionService.showCommandSuggestions(this._availableCommands as any);
    return firstValueFrom(race([
        this._sceneInteractionService.requestSceneMediumSelection<IActivitySubject & ISceneMedium>(
          this._controlsService.listenForSelectEvent(this._sceneService.canvasRef),
          r => r?.isActivitySubject && r?.activities.some(a => this._availableCommands.includes(a as any)),
        ),
        this._uiService.requestUiMediumSelection<IActivitySubject>(
          r => r?.isActivitySubject && r?.activities.some(a => this._availableCommands.includes(a as any))
        )
      ])
      .pipe(
        filter(() => this._settingsStore.currentState.interface.isInteractionAllowed),
        filter(r => r.value.activities.some(a => this._availableCommands.some(c => c.id === a.id))),
        tap(() => this._suggestionService.hideCommandSuggestions(this._availableCommands as any)),
        switchMap(r => iif(
          () => r.value.activities.length === 1,
          of(r.value.activities[0] as ICommand),
          this._uiService.requestCommandSelection(r.value.activities as ICommand[])
        )),
        tap((command: ICommand & IInteractableMedium) => {
          this.selectedCommand = command;
          command.indicate(this._gameStore, this._commandContext);
          this._sceneInteractionService.settleHovering();
        }),
        switchMap(command => this._uiService.requestConfirmation<ICommand>(command)),
        catchError(err => {
          console.warn(err);
          this._sceneInteractionService.clearIndicators()
          return of(false)
        }),
        tap((confirmed: boolean) => {
          this.isConfirmed = confirmed;
          this._sceneInteractionService.clearIndicators();
        }),
        takeUntil(this._finalize),
        defaultIfEmpty(false),
      )) as Promise<boolean> 
  }
}