import { IGame as g } from "@game-logic/lib/base/game/game.interface";
import { ICommand } from "./command.interface";
import { IInteractableMedium } from "../../game-ui/mixins/interactable-medium/interactable-medium.interface";
import { IHero } from "@game-logic/gameplay/modules/heroes/mixins/hero/hero.interface";
import { IPlayer } from "@game-logic/lib/base/player/players.interface";

export interface IGame extends g {
  getSelectedPawn(): IHero;
  getPawns(p: IPlayer): IHero[];
  getAvailableActivities(hero: any): Array<ICommand & IInteractableMedium>;
}