import { Guid } from "../../extensions/types";
import { IAbility } from "./entities/ability/ability.interface";

export interface IAbilitiesDataFeed {
  getAbilities: (ids?: Guid[]) => Promise<IAbility[]>;
  getAbility: (id: Guid) => Promise<IAbility>;
}