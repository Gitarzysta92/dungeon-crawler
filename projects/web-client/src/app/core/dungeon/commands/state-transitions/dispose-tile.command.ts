import { Observable } from "rxjs";
import { BaseCommandAsync } from "src/app/aspects/commands/command-bus/base-command";
import { RevertableAsync } from "src/app/aspects/commands/commands-stack/commands-stack.service";


export class DisposeTile extends BaseCommandAsync implements RevertableAsync  {
  canBeReverted: boolean;  
  finished: Observable<void>;

  public async execute(): Promise<void> {
    // this._hexChess.disposeActionTile(tile as ActionTile);
    // this._sceneService.disposeTile(sceneTile);
  }
  
  revertAsync: () => Promise<void>;
}