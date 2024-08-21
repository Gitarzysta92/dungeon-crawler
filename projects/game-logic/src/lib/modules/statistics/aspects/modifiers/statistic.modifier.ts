import { ModifierType } from "../../../../base/value/value.constants";
import { IModifierDeclaration, IModifierHandler } from "../../../../cross-cutting/modifier/modifier.interface";

export const STATISTIC_MODIFIER = "STATISTIC_MODIFIER"; 

export interface IStatisticModifier {
  delegateId: typeof STATISTIC_MODIFIER,
  target: string,
  type: ModifierType,
  value: number
}

export class StatisticModifierHandler implements IModifierHandler<IStatisticModifier> {
  delegateId = STATISTIC_MODIFIER;

  constructor() { }

  public static validate(data: IStatisticModifier): IStatisticModifier {
    return data;
  }

  public isApplicableTo(d: IModifierDeclaration) {
    return d.delegateId === this.delegateId;
  }

  public async process(p: IStatisticModifier): Promise<void> {
    
  }

}