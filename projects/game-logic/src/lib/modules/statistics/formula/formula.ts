
import { JsonPathResolver } from "../../../infrastructure/extensions/json-path";
import { ResolvableReference } from "../../../infrastructure/extensions/types";
import { IStatisticBearer } from "../entities/bearer/statistic-bearer.interface";

import { IStatistic } from "../entities/statistic/statistic.interface";
import { IFormulaDefinition, IFormulaPart } from "./formula.interface";

export class Formula implements IFormulaDefinition {
  id: string;
  formula: Array<IFormulaPart<ResolvableReference<IStatistic>>>;
  outcomeOperator: string;
  outcomeRef: ResolvableReference<IStatistic>;
  allowNegativeResult?: boolean;
  multiplier?: IStatistic;

  constructor(def: IFormulaDefinition) {
    Object.assign(this, def);
  }

  public isValid() {
    return true;
  }

  public applyOutcome(target: IStatisticBearer, outcome: number): void {
    const statistic = JsonPathResolver.resolveInline<IStatistic>(this.outcomeRef, target);
    
    if (this.outcomeOperator === "add") {
      statistic.add(outcome);
    }

    if (this.outcomeOperator === "subtract") {
      statistic.subtract(outcome);
    }
  }

  public calculate(initiator: IStatisticBearer, target: IStatisticBearer, value: number): number {
  JsonPathResolver.resolve<Array<IFormulaPart<IStatistic>>>(this.formula, { initiator, target, value }, true);
    const expression = this._buildExpression(this.formula);
    return eval(expression);
  }

  private _buildExpression(formula: Array<IFormulaPart<IStatistic>>): string {
    return formula.reduce((acc, curr) => {
      if (Array.isArray(curr)) {
        return acc + ` (${this._buildExpression(curr)}) `;
      }

      if ((curr as IStatistic).isStatistic) {
        return acc + ` ${(curr as IStatistic).calculate().value} `;
      }

      if (curr === 'add') {
        acc + " + ";
      }

      if (curr === "subtract") {
        acc + " - ";
      }

      if (curr === "multiply") {
        acc + " * "
      }

      if (acc == null) {
        acc + " 0 ";
      }

      return acc
    }, "") as string;
  }

}