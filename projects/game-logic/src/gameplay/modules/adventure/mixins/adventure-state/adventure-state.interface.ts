import { IState } from "../../../../../helpers/dispatcher/state.interface";
import { IEntityDeclaration } from "../../../../../lib/base/entity/entity.interface";
import { IGame } from "../../../../../lib/base/game/game.interface";
import { ISerializable } from "../../../../../lib/infrastructure/extensions/json-serializer";
import { Guid } from "../../../../../lib/infrastructure/extensions/types";
import { IMixin } from "../../../../../lib/infrastructure/mixin/mixin.interface";

import { IContinuousGameplayState } from "../../../../../lib/modules/continuous-gameplay/continuous-gameplay.interface";
import { IDungeonArea } from "../../../dungeon/mixins/dungeon-area/dungeon-area.interface";
import { IHero } from "../../../heroes/mixins/hero/hero.interface";


export interface IAdventureState extends IAdventureStateDeclaration, ISerializable<IAdventureStateDeclaration>, IState, IGame {
  visitedDungeon: IDungeonArea;
  hero: IHero;
}

export interface IAdventureStateDeclaration extends IMixin, IContinuousGameplayState {
  id: Guid,
  isAdventureState: true;
  entities: IEntityDeclaration[]
}

export type IAdventureGameplayDataGatherer = any;