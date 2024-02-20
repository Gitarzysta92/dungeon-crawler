import { IEntityFactory, IEntity } from "../../base/entity/entity.interface";
import { ModifierService } from "../../cross-cutting/modifier/modifier.service";
import { Ability } from "./ability";
import { IAbility, IAbilityDataFeed } from "./ability.interface";

export class AbilityFactory implements IEntityFactory<Ability> {

  public get classDefinition() { return Ability };

  constructor(
    private readonly _dataFeed: IAbilityDataFeed,
    private readonly _modifiersService: ModifierService
  ) { }
  
  public create(e: IAbility): Ability {
    return new Ability(this._modifiersService);
  };

  public validate(e: IEntity & Partial<Ability>): boolean {
    return e.isAbility;
  };

}