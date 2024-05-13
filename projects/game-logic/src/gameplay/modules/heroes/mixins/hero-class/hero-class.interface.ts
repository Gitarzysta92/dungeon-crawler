import { IEntityDeclaration } from "../../../../../lib/base/entity/entity.interface";
import { Guid } from "../../../../../lib/extensions/types";
import { IAbility, IAbilityDeclaration } from "../../../../../lib/modules/abilities/entities/ability/ability.interface";
import { IPerk, IPerkDeclaration } from "../../../../../lib/modules/perks/perk.interface";


export interface IHeroClass extends IHeroClassDeclaration {
  abilities: IAbility[];
  perks: IPerk[];
}


export interface IHeroClassDeclaration extends IEntityDeclaration {
  id: Guid;
  abilities: IAbilityDeclaration[];
  perks: IPerkDeclaration[];
  isHeroClass: true;
}
