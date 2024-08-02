import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, first } from 'rxjs';
import { IActivity } from '@game-logic/lib/base/activity/activity.interface';
import { ICommand, ICommandExecutionController } from '../interfaces/command.interface';
import { IGameStore } from '../interfaces/game-store.interface';
import { InteractionService } from './interaction.service';


@Injectable()
export class CommandService {

  public get currentProcess() { return this.process$.value };
  public process$: BehaviorSubject<CommandExecutionProcess | null> = new BehaviorSubject(null);

  constructor(
    private readonly _interactionService: InteractionService,
  ) { }

  public scheduleCommand(
    command: IActivity,
    gameStore: IGameStore,
    controller: ICommandExecutionController,
  ) {
    if (!!this.process$.value) {
      console.warn("Another command is processed")
      return;
    }
    if (!command) {
      throw new Error("Command not selected");
    }

    const process = new CommandExecutionProcess(
      command as ICommand,
      this._interactionService,
      gameStore,
      controller
    );
    process.isScheduled = true;
    this.process$.next(process);
    process.onFinalization.subscribe(() => this.process$.next(null));
  }
  

  public async executeCommand(
    activities: IActivity | IActivity[],
    gameStore: IGameStore,
    controller: ICommandExecutionController,
  ) {

    if (!!this.process$.value) {
      console.warn("Another command is processed")
      return;
    }

    if (!Array.isArray(activities)) {
      activities = [activities]
    }

    let commands = activities.filter((f: ICommand) => f.isCommand) as ICommand[];
    if (commands.length < 1) {
      throw new Error("Provided activities are not a command");
    }

    const commandTypes = {};
    for (let command of commands) {
      if (!(command.id in commandTypes)) {
        commandTypes[command.id] = [];
      }
      commandTypes[command.id].push(command);
    }
    
    const commandTypeKeys = Object.keys(commandTypes); 
    if (commandTypeKeys.length > 1) {
      commands = await controller.selectCommandType(commandTypes);
    } else {
      commands = commandTypes[commandTypeKeys[0]];
    }

    let command;
    if (commands.length > 1) {
      command = await controller.selectCommand(commands);
    } else {
      command = commands[0];
    }

    if (!command) {
      throw new Error("Command not selected");
    }

    const process = new CommandExecutionProcess(
      command,
      this._interactionService,
      gameStore,
      controller
    );
    process.isExecuting = true;
    this.process$.next(process);
    process.onFinalization.subscribe(() => this.process$.next(null));
    await process.executeCommand();
  }
}


export class CommandExecutionProcess {
  public isExecuted: boolean = false
  public isExecuting: boolean = false;
  public isScheduled: boolean = false;

  public get onFinalization() { return this._finalize.pipe(first()) }

  private _finalize: Subject<void> = new Subject();

  constructor(
    public selectedCommand: ICommand,
    private readonly _interactionService: InteractionService,
    private readonly _gameStore: IGameStore,
    private readonly _controller: unknown,
  ) { }

  public isProcessing(c: ICommand): boolean {
    return this.selectedCommand === c;
  }
  
  public async executeCommand(): Promise<void> {
    if (!this.selectedCommand) {
      throw new Error("Command not selected");
    }
    this.isExecuting = true;
    try {
      await this.selectedCommand.execute(this._gameStore, this._controller); 
    } catch (error) {
      this.isExecuting = false;
      this.finalize();
      throw error;
    }
    this.isExecuting = false;
    this.isExecuted = true;
    if (this.selectedCommand.preventAutofinalization) {
      return;
    }
    this.finalize();
  }

  public cancel(): void {
    this._interactionService.currentProcess?.cancel();
    this.finalize();
  }

  public finalize(): void {
    if (this.isExecuting) {
      throw new Error("Cannot finalize command during execution")
    }
    this.selectedCommand.onFinalization();
    this._finalize.next();
  }

}