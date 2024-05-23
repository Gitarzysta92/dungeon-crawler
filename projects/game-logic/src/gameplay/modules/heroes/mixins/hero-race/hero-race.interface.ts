import { IEntityDeclaration } from "../../../../../lib/base/entity/entity.interface";
import { Guid } from "../../../../../lib/infrastructure/extensions/types";
import { IAbility, IAbilityDeclaration } from "../../../../../lib/modules/abilities/entities/ability/ability.interface";
import { Side, Size } from "../../../../../lib/modules/board/entities/board-object/board-object.constants";
import { IPerk, IPerkDeclaration } from "../../../../../lib/modules/perks/perk.interface";
import { IStatistic, IStatisticDeclaration } from "../../../../../lib/modules/statistics/entities/statistic/statistic.interface";


export interface IHeroRace extends IHeroRaceDeclaration {
  abilities: IAbility[];
  perks: IPerk[];
  statistics: IStatistic[];
}

export interface IHeroRaceDeclaration extends IEntityDeclaration {
  id: Guid;
  size: Size;
  outlets: Side[];
  statistics: IStatisticDeclaration[];
  abilities: IAbilityDeclaration[];
  perks: IPerkDeclaration[];
  isHeroRace: true;
}

