import { IConditionDeclaration } from "../../../../cross-cutting/condition/condition.interface";
import { IModificable, IModifier, IModifierDeclaration } from "../../../../cross-cutting/modifier/modifier.interface";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory, IMixin } from "../../../../infrastructure/mixin/mixin.interface";
import { ModifierType } from "../../../../misc/value/value.constants";
import { IStatistic } from "../../../statistics/entities/statistic/statistic.interface";
import { IDamageParameter, IDamageParameterDeclaration } from "../parameters/damage.parameter";

export const DEAL_DAMAGE_MODIFIER = 'DEAL_DAMAGE_MODIFIER' as const;


export interface IDealDamageModifier extends IModifierDeclaration {
  delegateId: typeof DEAL_DAMAGE_MODIFIER,
  damageType: number,
  type: ModifierType,
  value: number
}

export class DealDamageModifierFactory implements IMixinFactory<IDealDamageModifier>  {

  constructor() {}

  public isApplicable(e: IDealDamageModifier): boolean {
    return e.isModifier && e.delegateId === DEAL_DAMAGE_MODIFIER;
  };
  
  public create(e: Constructor<IMixin & IModifier>): Constructor<IDealDamageModifier> {
    return class DamageModifier extends e implements IDealDamageModifier {

      public delegateId = DEAL_DAMAGE_MODIFIER;
      public isModifier = true as const;
      public conditions?: IConditionDeclaration<unknown>[];
      public type: ModifierType;
      public value: number;
      public damageType: number;

      constructor(data: IDealDamageModifier) {
        super(data);
        this.conditions = data.conditions;
        this.type = data.type;
        this.value = data.value;
      }

      public isApplicable(target: IDamageParameter): boolean {
        return target.isParameter &&
          target.isModificable &&
          target.isDamageParameter &&
          (!super.isApplicable || super.isApplicable(target))
      }

      public applyModifier(target: IDamageParameter & IModificable): void {
        if (!target.isModificable) {
          throw new Error("")
        }

        if (target.appliedModifiers.has(this)) {
          return;
        }
        target.appliedModifiers.set(this, this);
        if (super.applyModifier) {
          this.applyModifier(target);
        }

        target.value
      } 
    
    };
  }
}
