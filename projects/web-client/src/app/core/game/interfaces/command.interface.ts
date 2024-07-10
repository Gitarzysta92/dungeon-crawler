import { IActivity, IActivitySubject } from "@game-logic/lib/base/activity/activity.interface";
import { IInteractableMedium } from "../../game-ui/mixins/interactable-medium/interactable-medium.interface";
import { IGameStore } from "./game-store.interface";

export interface ICommand extends IActivity {
  subject: IActivitySubject & IInteractableMedium
  execute(store: IGameStore, context?: unknown): Promise<void>;
  indicate(store: IGameStore, context?: unknown): Promise<void>;
}