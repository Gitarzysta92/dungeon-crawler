import { EntityLifecycle } from "../../base/entity/entity.constants";
import { ModifierService } from "../../cross-cutting/modifier/modifier.service";
import { IAbility } from "./ability.interface";
import { IAbilityPerformer } from "./performer/ability-performer.interface";

export class Ability implements IAbility {
  id: string;
  abilityParameters: { [key: string]: number };
  isAbility: true;
  lifecycle: EntityLifecycle;
  wasUsed?: boolean;
  toRemove?: boolean;
  isEntity: true;
  abilityPerformer?: IAbilityPerformer;


  constructor(
    private readonly _modifiersService: ModifierService
  ) {}


  public calculateAbilityParameters() {
    return Object.entries(this.abilityParameters)
      .map(ap => this._modifiersService.process(ap, this.abilityPerformer))

  }
}