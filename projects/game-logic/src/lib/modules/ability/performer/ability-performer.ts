import { EntityLifecycle } from "../../../base/entity/entity.constants";
import { IAbility } from "../ability.interface";
import { IAbilityPerformer } from "./ability-performer.interface";

export class AbilityPerformer implements IAbilityPerformer {
  id: string;
  lifecycle: EntityLifecycle;
  wasUsed?: boolean;
  toRemove?: boolean;
  isEntity: true;
  isAbilityPerformer: true;
  abilityIds: string[];

  constructor(d: IAbilityPerformer) {
    Object.assign(this, d);
  }

  public isAbleToUseAbility(ability: IAbility): boolean {
    return true;
  }
}