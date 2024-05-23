import { IActionDeclaration, IActionHandler } from "../../../../cross-cutting/action/action.interface";
import { ResolvableReference } from "../../../../infrastructure/extensions/types";
import { IStatisticBearer } from "../../entities/bearer/statistic-bearer.interface";
import { IStatistic } from "../../entities/statistic/statistic.interface";

export const REGAIN_STATISTIC_ACTION = "MODIFY_STATISTIC_ACTION";

export interface IRegainStatisticActionPayload {
  statisticId?: string;
  bearer?: IStatisticBearer;
  statistic?: ResolvableReference<IStatistic>;
  value: number;
}

export class RegainStatisticActionHandler implements IActionHandler<IRegainStatisticActionPayload> {
  public delegateId = REGAIN_STATISTIC_ACTION;


  public isApplicableTo(d: IActionDeclaration<IRegainStatisticActionPayload>): boolean {
    return d.delegateId === this.delegateId;
  }

  public process(payload: IRegainStatisticActionPayload): void {
    if (payload.statisticId && !payload.bearer) {
      throw new Error("Cannot resolve statistic by id. Statistic bearer not provided.")
    }

    const target = payload.bearer as IStatisticBearer; 

    if (!target.isStatisticBearer ) {
      throw new Error("Provided target is not StatisticBearer");
    }

    let statistic = payload.statistic as IStatistic;

    if (!statistic) {
      statistic = target.getStatisticById(payload.statisticId);
    } 

    if (!statistic) {
      throw new Error(`Given StatisticBearer has not ${statistic?.id} statistic`)
    }

    statistic.regain(payload.value);
  }
}