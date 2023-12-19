import { Guid } from "../../extensions/types";

export interface IAbilityPerformer {
  id: Guid;
  availableAbilityIds: Guid;
}