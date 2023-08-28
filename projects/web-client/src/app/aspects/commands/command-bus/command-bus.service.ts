import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseCommand, Command } from './base-command';

export interface CommandBusFilter<T> {
  filter: (command: T) => boolean;
}

export interface CommandBusHandler<T extends BaseCommand> {
  handle: (command: T) => void;
  handleAsync?: (command: T) => Observable<void>;
}

export interface CommandBusMapper<T> {
  map: (command: T) => T;
}

export interface CommandBusSideEffect<T> {
  react: (command: T) => void;
}

@Injectable()
export class CommandBusService {

  private _processors: Array<(command: any) => boolean | void> = [];

  constructor() { }

  public dispatch<T extends BaseCommand>(command: Command<T>): void {
    for (let a of this._processors) {
      const result = a(command);
      if (result === false)
        break;
    }
  }

  public useFilter<T>(filter: CommandBusFilter<T>): void {
    this._processors.push((command: T) => filter.filter(command));
  }

  public useHandler<T extends BaseCommand>(handler: CommandBusHandler<T>): void {
    debugger;
    this._processors.push((command: T) => {
      handler.handle(command);
      return;
    });
  }

  public useMapper<T extends BaseCommand>(mapper: CommandBusMapper<T>) {
    this._processors.push((command: T) => {
      mapper.map(command);
      return;
    });
  }

  public useSideEffect<T>(sideEffect: CommandBusSideEffect<T>) {
    this._processors.push((command: T) => {
      sideEffect.react(command);
      return;
    });
  }
}