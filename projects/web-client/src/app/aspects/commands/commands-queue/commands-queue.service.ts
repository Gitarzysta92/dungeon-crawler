import { Injectable } from '@angular/core';
import { BaseCommandAsync, BaseCommand} from '../command-bus/base-command';
import { CommandBusHandler } from '../command-bus/command-bus.service';

@Injectable()
export class CommandsQueueService implements CommandBusHandler<BaseCommand | BaseCommandAsync> {

  private _queue: (BaseCommand | BaseCommandAsync)[] = [];
  private _isProcessing: boolean = false;

  constructor() { }

  public handle(command: BaseCommand | BaseCommandAsync) {
    this._queue.push(command);

    if (this._queue.length === 1 && this._isProcessing === false) {
      this._process();
    }
  }

  private async _process(): Promise<void> {
    this._isProcessing = true;
    const command = this._queue.shift();
    await command.execute();

    if (this._queue.length > 0) {
      this._process();
    }
    this._isProcessing = false;
  }
}
