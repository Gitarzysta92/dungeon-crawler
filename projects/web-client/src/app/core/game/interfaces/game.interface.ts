import { IGameplay as g } from "@game-logic/lib/base/gameplay/gameplay.interface";
import { ICommand } from "./command.interface";
import { IInteractableMedium } from "../../game-ui/mixins/interactable-medium/interactable-medium.interface";
import { IHero } from "@game-logic/gameplay/modules/heroes/mixins/hero/hero.interface";
import { IPlayer } from "@game-logic/lib/base/player/players.interface";
import { IEntity } from "@game-logic/lib/base/entity/entity.interface";
import { IUiMedium } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { ISceneMedium } from "../../scene/mixins/scene-medium/scene-medium.interface";
import { IBoardTraveler } from "@game-logic/gameplay/modules/board-areas/entities/board-traveler/board-traveler.interface";
import { IPawn } from "@game-logic/lib/base/pawn/pawn.interface";
import { IModifierExposer } from "@game-logic/lib/cross-cutting/modifier/modifier.interface";

export interface IGameplay extends g {
  entities: Array<IEntity & Partial<IUiMedium> & Partial<ISceneMedium>>;
  getSelectedPawn(p?: IPlayer): IHero & ISceneMedium;
  getCurrentPlayerSelectedPawn<T extends IPawn & IBoardTraveler>(): T
  getPawns(p: IPlayer): IHero[];
  getAvailableActivities(hero: any): Array<ICommand & IInteractableMedium>;
}


export type IGameplayEntity = IEntity & Partial<IUiMedium> & Partial<ISceneMedium> & Partial<IModifierExposer>