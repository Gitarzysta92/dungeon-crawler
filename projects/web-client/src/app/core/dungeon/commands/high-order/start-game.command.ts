import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseCommandAsync, CommandMetadata } from "src/app/aspects/commands/command-bus/base-command";

@Injectable()
export class StartGame extends BaseCommandAsync {

  public static metadata: CommandMetadata = { name: "Start Game" };

  public finished: Observable<void>;

  constructor() {
    super();
  }

  public async execute(): Promise<void> {

  }

}