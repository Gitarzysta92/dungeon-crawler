import { IContinuousGameplayState } from "../../../../../lib/modules/continuous-gameplay/continuous-gameplay.interface";
import { IEntityDeclaration } from "../../../../../lib/base/entity/entity.interface";
import { Guid } from "../../../../../lib/extensions/types";
import { IMixin } from "../../../../../lib/base/mixin/mixin.interface";
import { IState } from "../../../../../lib/base/state/state.interface";
import { ISerializable } from "../../../../../lib/extensions/json-serializer";
import { IDungeonArea } from "../../../dungeon/mixins/dungeon-area/dungeon-area.interface";
import { IHero } from "../../../heroes/mixins/hero/hero.interface";
import { IActivity } from "../../../../../lib/base/activity/activity.interface";

export interface IAdventureState extends IAdventureStateDeclaration, ISerializable<IAdventureStateDeclaration>, IState {
  visitedDungeon: IDungeonArea;
  hero: IHero;
  getAllowedActivities(): Array<IActivity>
}

export interface IAdventureStateDeclaration extends IMixin, IContinuousGameplayState {
  id: Guid,
  isAdventureState: true;
  entities: IEntityDeclaration[]
}

export type IAdventureGameplayDataGatherer = any;