import { ModifierType } from "../../../../misc/value/value.constants";
import { IModificable, IModifier } from "../../../../cross-cutting/modifier/modifier.interface";
import { IMixin, IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IConditionDeclaration } from "../../../../cross-cutting/condition/condition.interface";
import { IStatistic } from "../../entities/statistic/statistic.interface";

export const STATISTIC_MODIFIER = "STATISTIC_MODIFIER" as const; 

export interface IStatisticModifier extends IModifier {
  delegateId: typeof STATISTIC_MODIFIER,
  statisticId: string,
  type: ModifierType,
  value: number
}


export class StatisticModifierFactory implements IMixinFactory<IStatisticModifier>  {

  constructor() {}

  public isApplicable(e: IStatisticModifier): boolean {
    return e.isModifier && e.delegateId === STATISTIC_MODIFIER;
  };
  
  public create(e: Constructor<IMixin & IModifier>): Constructor<IStatisticModifier> {
    return class StatisticModifier extends e implements IStatisticModifier {

      public delegateId = STATISTIC_MODIFIER;
      public statisticId: string;
      public isModifier = true as const;
      public conditions?: IConditionDeclaration<unknown>[];
      public type: ModifierType;
      public value: number;

      constructor(data: IStatisticModifier) {
        super(data);
        this.statisticId = data.statisticId;
        this.conditions = data.conditions;
        this.type = data.type;
        this.value = data.value;
      }

      public isApplicable(target: IStatistic & IModificable): boolean {
        return target.isStatistic &&
          target.isModificable &&
          target.id === this.statisticId &&
          (!super.isApplicable || super.isApplicable(target))
      }

      public applyModifier(target: IStatistic & IModificable): void {
        target.appliedModifiers.set(this, this);

        if (super.applyModifier) {
          this.applyModifier(target);
        }
      }

      public process(v: IStatistic & IModificable): number {
        return 0;
      }
    
    };
  }
}