import { IActionDeclaration, IActionHandler } from "../../../../cross-cutting/action/action.interface";
import { ResolvableReference } from "../../../../infrastructure/extensions/types";
import { IStatisticBearer } from "../../entities/bearer/statistic-bearer.interface";
import { IStatistic } from "../../entities/statistic/statistic.interface";

export const MODIFY_STATISTIC_ACTION = "MODIFY_STATISTIC_ACTION";

export interface IModifyStatisticActionDeclaration {
  statisticId?: string;
  bearer?: ResolvableReference<IStatisticBearer>;
  statistic?: ResolvableReference<IStatistic>;
  value: ResolvableReference<number>;
  operator: 'add' | 'substract';
}


export interface IModifyStatisticActionPayload {
  statisticId?: string;
  bearer?: IStatisticBearer;
  statistic?: IStatistic;
  value: number;
  operator: 'add' | 'substract';
}

export interface IModifyActionResult {
  target: IStatisticBearer;
  statistic: IStatistic;
  value: number;
  operator: 'add' | 'substract'
}

export class ModifyStatisticActionHandler implements IActionHandler<IModifyStatisticActionPayload, IModifyActionResult> {
  public delegateId = MODIFY_STATISTIC_ACTION;


  public isApplicableTo(d: IActionDeclaration<IModifyStatisticActionPayload>): boolean {
    return d.delegateId === this.delegateId;
  }

  public process(payload: IModifyStatisticActionPayload): IModifyActionResult {
    if (payload.statisticId && !payload.bearer) {
      throw new Error("Cannot resolve statistic by id. Statistic bearer not provided.")
    }
    let target = payload.bearer as IStatisticBearer;
    if (!target?.isStatisticBearer ) {
      throw new Error("Provided target is not StatisticBearer");
    }

    let statistic = payload.statistic as IStatistic;

    if (!statistic) {
      statistic = target.getStatisticById(payload.statisticId);
    } 

    if (!statistic) {
      throw new Error(`Given StatisticBearer has not ${statistic?.id} statistic`)
    }

    if (payload.operator === 'add') {
      statistic.add(payload.value);
    }

    if (payload.operator === 'substract') {
      statistic.subtract(payload.value);
    }

    return {
      target: target,
      statistic: statistic,
      value: payload.value,
      operator: payload.operator
    }
  }
}