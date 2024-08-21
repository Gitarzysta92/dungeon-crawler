import { IActivityCost, IActivityDoer } from "../../../../base/activity/activity.interface";
import { IEntityDeclaration, IEntity } from "../../../../base/entity/entity.interface";
import { Constructor, Guid } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { IAbility } from "../ability/ability.interface";
import { IAbilityPerformer, IAbilityPerformerDeclaration } from "./ability-performer.interface";

export class AbilityPerformerFactory implements IMixinFactory<IAbilityPerformer> {

  constructor() { }
    
  public isApplicable(e: IEntityDeclaration & Partial<IAbilityPerformer>): boolean {
    return e.isAbilityPerformer;
  };

  public create(e: Constructor<IEntity & IActivityDoer>): Constructor<IAbilityPerformer> {
    class AbilityPerformer extends e implements IAbilityPerformer {
      
      public isAbilityPerformer = true as const;
      public entities: IAbility[];

      public get abilities() { return this.getEntities<IAbility>(e => e.isAbility) }
      
      constructor(d: IAbilityPerformerDeclaration) {
        super(d);
      }

      public validateActivityResources(d: IActivityCost[]): boolean {
        if (super.validateActivityResources) {
          return super.validateActivityResources(d);
        }
        return true;
      }

      public consumeActivityResources(d: IActivityCost[]): void {
        if (super.consumeActivityResources) {
          return super.consumeActivityResources(d);
        }
      }
    
      public onInitialize(): void {
        this.abilities.forEach(a => a.abilityPerformer = new WeakRef(this));
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