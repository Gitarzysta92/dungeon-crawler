import { IState } from "../../../../../helpers/dispatcher/state.interface";
import { IGame, IGameDeclaration } from "../../../../../lib/base/game/game.interface";
import { ISerializable } from "../../../../../lib/infrastructure/extensions/json-serializer";
import { Guid } from "../../../../../lib/infrastructure/extensions/types";
import { IMixin } from "../../../../../lib/infrastructure/mixin/mixin.interface";

import { IContinuousGameplayState } from "../../../../../lib/modules/continuous-gameplay/continuous-gameplay.interface";
import { IDungeonArea } from "../../../dungeon/mixins/dungeon-area/dungeon-area.interface";
import { IHero } from "../../../heroes/mixins/hero/hero.interface";


export interface IAdventureState extends Omit<IAdventureStateDeclaration, 'entities'>, ISerializable<IAdventureStateDeclaration>, IState, IGame {
  visitedDungeon: IDungeonArea;
  hero: IHero;
  hydrate(a: any): Promise<void>
}

export interface IAdventureStateDeclaration extends IMixin, IContinuousGameplayState, IGameDeclaration {
  id: Guid,
  isAdventureState: true;
  visitedDungeonAreaId?: Guid;
}

export type IAdventureGameplayDataGatherer = any;