import { IEntity } from "../../../base/entity/entity.interface";
import { Guid } from "../../../extensions/types";

export interface IAbilityPerformer extends IEntity {
  id: Guid;
  abilityIds: Guid[];
  isAbilityPerformer: true;
}
