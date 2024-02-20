import { ResolvableReference } from "../../../extensions/types";
import { IStatisticBearer } from "../bearer/statistic-bearer.interface";
import { IStatistic } from "../statistic.interface";


export interface IStatisticModificationFormulaDefinition {
  id: string;
  formula: IStatisticModificationFormulaPart[];
  outcomeOperator: string;
  outcomeRef: ResolvableReference<IStatistic>;
  allowNegativeResult?: boolean;
  initiator?: IStatisticBearer<[]>;
  target?: IStatisticBearer<[]>;
}

export type IStatisticModificationFormulaPart =
  IDealDamageFormulaStatisticRef |
  string |
  Array<IStatisticModificationFormulaPart>;

export interface IDealDamageFormulaStatisticRef {
  statisticRef: ResolvableReference<IStatistic>;
  optional?: boolean;
}