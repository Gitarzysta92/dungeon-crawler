import { Observable, Subject, take } from "rxjs";

export type Command<T extends BaseCommand> = Pick<T, 'setParameters' | 'dispatch'>;
export type CommandAsync<T extends BaseCommandAsync> = Pick<T, 'setParameters' | 'dispatch' | 'finished$'>;


export abstract class BaseCommand {
  abstract execute(): void;
  public alreadyHandled!: boolean;
  public metadata?: CommandMetadata
}

export interface BaseCommand {
  dispatch(): Command<this>;
  setParameters(...args: any[]): Command<this>;
}

export interface CommandMetadata {
  name: string;
}

export abstract class BaseCommandAsync extends BaseCommand {
  abstract execute(): Promise<void>;
  protected finish = new Subject<void>();
  finished$: Observable<void> = this.finish.pipe(take(1));
}

export interface BaseCommandAsync {
  dispatch(): CommandAsync<this>;
}
