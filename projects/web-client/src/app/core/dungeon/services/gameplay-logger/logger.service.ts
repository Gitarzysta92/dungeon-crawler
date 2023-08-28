import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BaseCommand, BaseCommandAsync } from 'src/app/aspects/commands/command-bus/base-command';
import { CommandBusMapper } from 'src/app/aspects/commands/command-bus/command-bus.service';

@Injectable()
export class GameplayLoggerService implements CommandBusMapper<BaseCommand | BaseCommandAsync> {

  public logs$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor() { }

  public map(command: BaseCommand | BaseCommandAsync) {

    if ('execute' in command) {
      const commandMethod1 = command.execute;


      if (command.hasOwnProperty('finished$')) {
        command.execute = async () => {
          await commandMethod1.call(command);
          this._pushLog(command.metadata || command);         
        }
      } else {
        command.execute = () => {
          commandMethod1.call(command);
          this._pushLog(command.metadata || command);
        }
      }
    }
    
    return command as BaseCommand;
  }

  private _pushLog(log: any): void {
    console.log('handler', log);
    this.logs$.next([log, ...this.logs$.value])
  }
}

