import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IMixinFactory } from "../../../../base/mixin/mixin.interface";
import { IAbilityPerformer, IAbilityPerformerDeclaration } from "./ability-performer.interface";
import { IAbility } from "../ability/ability.interface";
import { Constructor, Guid } from "../../../../extensions/types";

export class AbilityPerformerFactory implements IMixinFactory<IAbilityPerformer> {

  constructor() { }
    
  public validate(e: IEntityDeclaration & Partial<IAbilityPerformer>): boolean {
    return e.isAbilityPerformer;
  };

  public create(e: Constructor<IEntity>): Constructor<IAbilityPerformer> {
    class AbilityPerformer extends e implements IAbilityPerformer {
      
      isAbilityPerformer = true as const;
      abilities: IAbility[];
      
      constructor(d: IAbilityPerformerDeclaration) {
        super(d);
        this.abilities = d.abilities as IAbility[];
      }
    
      public onInitialize(): void {
        this.abilities.forEach(a => a.abilityPerformer = this);
        super.onInitialize();
      }
    
      public isAbleToUseAbility(a: IAbility | Guid): boolean {
        return this.hasAbility(a);
      }

      public hasAbility(a: IAbility | Guid): boolean {
        return this.abilities.some(a => a.id === a.id ?? a);
      }

      public addAbility(a: IAbility): void {
        this.abilities.push(a);
      }

      public removeAbility(a: IAbility): void {
        const i = this.abilities.indexOf(a);
        if (i < 0) {
          return;
        }
        this.abilities.splice(i, 1);
      }
    }
    return AbilityPerformer;
  };

}