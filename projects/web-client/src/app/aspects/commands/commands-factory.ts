import { Injectable, Injector, StaticProvider } from "@angular/core";
import { BaseCommand, Command } from "./command-bus/base-command";
import { CommandBusService } from "./command-bus/command-bus.service";

export interface CommandFactoryProvider {
  command: any,
  deps: any[]
}

@Injectable()
export class CommandsFactory {
  private _injector: Injector;

  constructor(
    private readonly _parentInjector: Injector,
    private readonly _commandsBusService: CommandBusService
  ) {}

  public create<T extends BaseCommand>(commandType: new(...args: any[]) => T): Command<T> {
    const command = this._injector.get(commandType)();
    return Object.assign(command, {
      dispatch: () => {
        this._commandsBusService.dispatch.call(this._commandsBusService, command);
        return command;
      }
    });
  }

  public initialize(providers: CommandFactoryProvider[]): void {
    if (this._injector != null)
      return;

    this._injector = Injector.create({
      parent: this._parentInjector,
      providers: providers.map(p => this._createFactoryProvider(p.command, p.deps))
    });
  }

  private _createFactoryProvider(command: any, deps: any[]): StaticProvider {
    return {
      provide: command,
      useFactory: (...params) => {
        return () => {
          const c = Reflect.construct(command, params);
          c.metadata = command.metadata;
          return c;
        };
      },
      deps: deps || []
    }
  }
}
