import { IActivity, IActivitySubject } from "@game-logic/lib/base/activity/activity.interface";
import { IInteractableMedium } from "../../game-ui/mixins/interactable-medium/interactable-medium.interface";
import { IGameStore } from "./game-store.interface";

export interface ICommand extends IActivity {
  isCommand: true
  subject: IActivitySubject & IInteractableMedium
  indicate(store: IGameStore): Promise<void>;
  execute(store: IGameStore, controller: unknown,): Promise<void>;
  finalize(): void
}

export interface ICommandExecutionController {
  selectCommandType(types: { [key: string]: ICommand[] }): Promise<ICommand[]>;
  selectCommand(commands: ICommand[]): Promise<ICommand>;
}