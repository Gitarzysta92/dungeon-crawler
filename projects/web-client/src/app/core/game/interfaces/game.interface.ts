import { IGame as g } from "@game-logic/lib/base/game/game.interface";
import { ICommand } from "./command.interface";
import { IInteractableMedium } from "../../game-ui/mixins/interactable-medium/interactable-medium.interface";

export interface IGame extends g {
  getAvailableActivities(hero: any): Array<ICommand & IInteractableMedium>;
}