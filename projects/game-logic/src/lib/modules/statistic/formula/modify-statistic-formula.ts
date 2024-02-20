
import { ResolvableReference } from "../../../extensions/types";
import { StatisticBearer } from "../bearer/statistic-bearer";
import { IStatistic } from "../statistic.interface";
import { IStatisticModificationFormulaDefinition, IStatisticModificationFormulaPart } from "./modify-statistic-formula.interface";

export class ModifyStatisticFormula implements IStatisticModificationFormulaDefinition {
  private _formula: IStatisticModificationFormulaPart[];
  private _allowNegativeResult?: boolean;
  private _outcomeRef: ResolvableReference<IStatistic>

  constructor(data: IStatisticModificationFormulaDefinition) {
    this._formula = data.formula;
    this._allowNegativeResult = data.allowNegativeResult;
    this._outcomeRef = data.outcomeRef;
  }
  formula: IStatisticModificationFormulaPart[];
  outcomeOperator: string;
  outcomeRef: ResolvableReference<IStatistic>;
  allowNegativeResult?: boolean;
  initiator?;
  target?;

  public isValid() {
    return true;
  }

  public calculate(initiatorStats: StatisticBearer, targetStats: StatisticBearer) {
    throw new Error("Method not implemented.");
  }

  public applyOutcome(target: StatisticBearer) {
    throw new Error("Method not implemented.");
  }
}