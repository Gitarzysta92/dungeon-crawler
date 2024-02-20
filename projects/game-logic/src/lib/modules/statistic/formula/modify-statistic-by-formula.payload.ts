
import { IModifyStatisticByFormulaActionPayload } from "../aspects/actions/modify-statistic-by-formula.action";
import { StatisticBearer } from "../bearer/statistic-bearer";
import { ModifyStatisticFormula } from "./modify-statistic-formula";


export class ModifyStatisticByFormulaActionPayload implements IModifyStatisticByFormulaActionPayload {
  value: number;
  initiator: StatisticBearer;
  target: StatisticBearer;
  formula?: ModifyStatisticFormula;

  constructor(p :IModifyStatisticByFormulaActionPayload) {
    this.formula = new ModifyStatisticFormula(p.formula)
  }
}
