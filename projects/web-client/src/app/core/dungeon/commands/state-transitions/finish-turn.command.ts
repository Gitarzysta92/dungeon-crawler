import { Injectable } from "@angular/core";
import { BaseCommandAsync, CommandMetadata } from "src/app/aspects/commands/command-bus/base-command";
import { GameLogicService } from "src/app/core/dungeon-logic/api";

@Injectable()
export class FinishTurn extends BaseCommandAsync {
  
  public static metadata: CommandMetadata = { name: "Finish turn" };

  constructor(
    private readonly _gameplayService: GameLogicService,
  ) {
    super();
  } 

  public async execute(): Promise<void> {
    this._gameplayService.finishTurn();
    this.finish.next();
  }
}