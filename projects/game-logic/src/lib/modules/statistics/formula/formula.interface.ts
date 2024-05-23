
import { ResolvableReference } from "../../../infrastructure/extensions/types";
import { IStatisticBearer } from "../entities/bearer/statistic-bearer.interface";
import { IStatistic } from "../entities/statistic/statistic.interface";

export interface IFormulaDefinition {
  id: string;
  formula: Array<IFormulaPart<IStatistic>>;
  outcomeOperator: string;
  outcomeRef: ResolvableReference<IStatistic>;
  allowNegativeResult?: boolean;
  initiator?: IStatisticBearer;
  target?: IStatisticBearer;
  multiplier?: IStatistic;
}

export type IFormulaPart<S> = S | string | Array<IFormulaPart<S>>;