import { IGame as g } from "@game-logic/lib/base/game/game.interface";
import { ICommand } from "./command.interface";
import { IInteractableMedium } from "../../game-ui/mixins/interactable-medium/interactable-medium.interface";
import { IHero } from "@game-logic/gameplay/modules/heroes/mixins/hero/hero.interface";
import { IPlayer } from "@game-logic/lib/base/player/players.interface";
import { IEntity } from "@game-logic/lib/base/entity/entity.interface";
import { IUiMedium } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { ISceneMedium } from "../../scene/mixins/scene-medium/scene-medium.interface";

export interface IGame extends g {
  entities: Array<IEntity & Partial<IUiMedium> & Partial<ISceneMedium>>;
  getSelectedPawn(p?: IPlayer): IHero & ISceneMedium;
  getPawns(p: IPlayer): IHero[];
  getAvailableActivities(hero: any): Array<ICommand & IInteractableMedium>;
}