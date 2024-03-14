import { IEntityFactory, IEntity } from "../../../../base/entity/entity.interface";
import { ModifierService } from "../../../../cross-cutting/modifier/modifier.service";
import { IAbilitiesDataFeed } from "../../abilities.interface";
import { IAbility, IAbilityDeclaration } from "./ability.interface";
import { Entity } from "../../../../base/entity/entity";
import { NotEnumerable } from "../../../../extensions/object-traverser";
import { Constructor } from "../../../../extensions/types";
import { IAbilityPerformer } from "../performer/ability-performer.interface";

export class AbilityFactory implements IEntityFactory<IAbility> {

  constructor(
    private readonly _dataFeed: IAbilitiesDataFeed,
    private readonly _modifiersService: ModifierService
  ) { }

  public validate(e: IEntity & Partial<IAbility>): boolean {
    return e.isAbility;
  };

  public create(e: typeof Entity): Constructor<IAbility> {
    const modifiersService = this._modifiersService;
    class Ability extends e implements IAbility {
      id: string;
      abilityParameters: { [key: string]: number };
      isAbility: true;

      @NotEnumerable()
      abilityPerformer: IAbilityPerformer;
      
      private _modifiersService: ModifierService = modifiersService;
    
      constructor(d: IAbilityDeclaration) {
        super(d);
      }
    
      public calculateAbilityParameters() {
        return Object.entries(this.abilityParameters)
          .map(ap => this._modifiersService.process(ap, this.abilityPerformer))
    
      }
    }
    return Ability;
  };

}