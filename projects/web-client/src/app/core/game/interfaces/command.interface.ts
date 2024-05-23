import { IActivity, IActivitySubject } from "@game-logic/lib/base/activity/activity.interface";
import { IInteractableMedium } from "../../game-ui/mixins/interactable-medium/interactable-medium.interface";

export interface ICommand extends IActivity {
  subject: IActivitySubject & IInteractableMedium
  execute(performer: any, store?: unknown): Promise<void>;
  indicate(performer: any, store?: unknown): Promise<void>;
}