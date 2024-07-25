import { IActivitySubject } from "../../../../base/activity/activity.interface";
import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { ModifierService } from "../../../../cross-cutting/modifier/modifier.service";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { IAbilitiesDataFeed } from "../../abilities.interface";
import { IAbilityPerformer } from "../performer/ability-performer.interface";
import { IAbility, IAbilityDeclaration, IAbilityParameter } from "./ability.interface";


export class AbilityFactory implements IMixinFactory<IAbility> {

  constructor(
    private readonly _dataFeed: IAbilitiesDataFeed,
    private readonly _modifiersService: ModifierService
  ) { }

  public isApplicable(e: IEntityDeclaration & Partial<IAbility>): boolean {
    return e.isAbility;
  };

  public create(e: Constructor<IEntity & IActivitySubject>): Constructor<IAbility> {
    const modifiersService = this._modifiersService;
    class Ability extends e implements IAbility {
      id: string;
      abilityParameters: { [key: string]: IAbilityParameter };
      isAbility = true as const;

      public abilityPerformer: WeakRef<IAbilityPerformer>

      constructor(d: IAbilityDeclaration) {
        super(d);
        this.id = d.id;
        this.parameters = d.parameters;
      }
      parameters: { [key: string]: IAbilityParameter; };
      modifiers?: any;

      public calculateAbilityParameters() {
        const performer = this.abilityPerformer.deref();
        return Object.entries(this.abilityParameters)
          .map(ap => modifiersService.process(ap[1], performer));
      }
    }
    return Ability;
  };

}