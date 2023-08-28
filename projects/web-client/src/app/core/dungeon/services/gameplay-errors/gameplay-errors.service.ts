import { Injectable } from '@angular/core';
import { BaseCommand, BaseCommandAsync } from 'src/app/aspects/commands/command-bus/base-command';
import { CommandBusMapper } from 'src/app/aspects/commands/command-bus/command-bus.service';



@Injectable()
export class GameplayErrorsService implements CommandBusMapper<BaseCommand | BaseCommandAsync> {

  constructor() { }

  map(command: BaseCommand | BaseCommandAsync) {
    if ('execute' in command) {
      const commandMethod1 = command.execute;

      if (command.hasOwnProperty('finished$')) {
        command.execute = async () => {
          try {
            await commandMethod1.call(command);
          } catch (error) {
            console.error(error); 
          }
        }
      } else {
        command.execute = () => {
          try {
            commandMethod1.call(command);
          } catch (error) {
            console.error(error); 
          }
        }
      }
    }
    
    return command as BaseCommand;
  }
}

