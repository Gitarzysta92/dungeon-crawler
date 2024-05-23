import { Guid } from "../../infrastructure/extensions/types";
import { IAbilityDeclaration } from "./entities/ability/ability.interface";

export interface IAbilitiesDataFeed {
  getAbilities: (ids?: Guid[]) => Promise<IAbilityDeclaration[]>;
  getAbility: (id: Guid) => Promise<IAbilityDeclaration>;
}