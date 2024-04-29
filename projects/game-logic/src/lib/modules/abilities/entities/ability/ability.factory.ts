import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IMixinFactory } from "../../../../base/mixin/mixin.interface";
import { ModifierService } from "../../../../cross-cutting/modifier/modifier.service";
import { IAbilitiesDataFeed } from "../../abilities.interface";
import { IAbility, IAbilityDeclaration, IAbilityParameter } from "./ability.interface";
import { NotEnumerable } from "../../../../extensions/object-traverser";
import { Constructor } from "../../../../extensions/types";
import { IAbilityPerformer } from "../performer/ability-performer.interface";
import { IActivitySubject } from "../../../../base/activity/activity.interface";


export class AbilityFactory implements IMixinFactory<IAbility> {

  constructor(
    private readonly _dataFeed: IAbilitiesDataFeed,
    private readonly _modifiersService: ModifierService
  ) { }

  public validate(e: IEntityDeclaration & Partial<IAbility>): boolean {
    return e.isAbility;
  };

  public create(e: Constructor<IEntity & IActivitySubject>): Constructor<IAbility> {
    const modifiersService = this._modifiersService;
    class Ability extends e implements IAbility {
      id: string;
      abilityParameters: { [key: string]: IAbilityParameter };
      isAbility: true;

      @NotEnumerable()
      abilityPerformer: IAbilityPerformer;
          
      constructor(d: IAbilityDeclaration) {
        super(d);
      }

      public calculateAbilityParameters() {
        return Object.entries(this.abilityParameters)
          .map(ap => modifiersService.process(ap[1], this.abilityPerformer))
    
      }
    }
    return Ability;
  };

}