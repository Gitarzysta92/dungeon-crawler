import { Injectable } from '@angular/core';
import { BaseCommandAsync, BaseCommand } from '../command-bus/base-command';
import { CommandBusHandler } from '../command-bus/command-bus.service';
import { CommandsQueueService } from '../commands-queue/commands-queue.service';

export interface Revertable {
  canBeReverted: boolean;
  revert: () => void
}

export interface RevertableAsync {
  canBeReverted: boolean;
  revertAsync: () => Promise<void>
}

export type RevertableCommand = BaseCommand & Revertable;
export type RevertableCommandAsync = BaseCommandAsync & RevertableAsync;

@Injectable()
export class CommandsStackService implements CommandBusHandler<RevertableCommand> {

  public get isEmpty(): boolean { return this._stack.length === 0 }

  private _stack: (RevertableCommand | RevertableCommandAsync)[] = [];

  constructor(
    private readonly commandsQueueService: CommandsQueueService
  ) { }

  public handle(command: RevertableCommand | RevertableCommandAsync): void {
    if (!this._checkIsRevertable(command) || command.alreadyHandled)
      return;
    this.commandsQueueService.handle(command);
    command.alreadyHandled = true;
    this._stack.unshift(command);
  }

  public revert(): void {
    const command = this._stack.shift();
    if (!command)
      return;
    try {
      if (!!(command as Revertable).revert) {
        this.commandsQueueService.handle({ execute: () => (command as Revertable).revert() } as BaseCommand) 
      } else {
        this.commandsQueueService.handle({ execute: () => (command as RevertableAsync).revertAsync() } as BaseCommandAsync) 
      } 
    } catch (error) {
      this._stack.unshift(command);
      throw error;
    }
  }

  public clearStack(): void {
    this._stack.length = 0;
  }

  private _checkIsRevertable<T extends Revertable | RevertableAsync>(command: T): boolean {
    return !!((command as Revertable).revert || (command as RevertableAsync).revertAsync);
  }
}