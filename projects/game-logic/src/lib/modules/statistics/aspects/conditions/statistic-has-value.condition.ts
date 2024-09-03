import { IActionDeclaration } from "../../../../cross-cutting/action/action.interface";
import { IConditionHandler } from "../../../../cross-cutting/condition/condition.interface";
import { IStatisticBearer } from "../../entities/bearer/statistic-bearer.interface";
import { IStatistic } from "../../entities/statistic/statistic.interface";

export const STATISTIC_HAS_VALUE = "STATISTIC_HAS_VALUE";

export interface IStatisticHasValueConditionPayload {
  statisticId?: string;
  bearer: IStatisticBearer;
  value: number;
  comparator: number
}

export class StatisticHasValueConditionHandler implements IConditionHandler<IStatisticHasValueConditionPayload> {
  public delegateId = STATISTIC_HAS_VALUE;


  public isApplicableTo(d: IActionDeclaration<IStatisticHasValueConditionPayload>): boolean {
    return d.delegateId === this.delegateId;
  }

  public process(payload: IStatisticHasValueConditionPayload): boolean {
    if (!payload.bearer) {
      throw new Error("Statistic bearer not provided.")
    }
    
    const statistic = payload.bearer.getStatisticById(payload.statisticId);
    if (!statistic) {
      throw new Error("Provided statistic bearer has not required statistic");
    }

    return statistic.value <= payload.value
  }
}