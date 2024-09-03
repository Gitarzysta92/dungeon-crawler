
import { IActionDeclaration, IActionHandler } from "../../../../cross-cutting/action/action.interface";
import { Guid } from "../../../../infrastructure/extensions/types";
import { IStatisticBearer } from "../../entities/bearer/statistic-bearer.interface";
import { Formula } from "../../formula/formula";
import { IFormulaDefinition } from "../../formula/formula.interface";
import { FormulaService } from "../../formula/formula.service";

export const MODIFY_STATISTIC_BY_FORMULA_ACTION = "MODIFY_STATISTIC_BY_FORMULA_ACTION";

export interface IModifyStatisticByFormulaActionPayload {
  value: number;
  initiator: IStatisticBearer;
  target: IStatisticBearer;
  formula?: IFormulaDefinition
  formulaId: Guid;
}

export class ModifyStatisticByFormulaActionHandler implements IActionHandler<IModifyStatisticByFormulaActionPayload> {

  public delegateId = MODIFY_STATISTIC_BY_FORMULA_ACTION;

  constructor(
    private readonly _formulaService: FormulaService
  ) { }
    
  public isApplicableTo(m: IActionDeclaration<IModifyStatisticByFormulaActionPayload>): boolean {
    return this.delegateId === m.delegateId;
  }

  public process(payload: IModifyStatisticByFormulaActionPayload): void {
    const initiator = payload.initiator;
    const target = payload.target;

    if (!target.isStatisticBearer || !initiator.isStatisticBearer) {
      throw new Error("Provided initiator and target are not StatisticBearers");
    }

    let formula: Formula;
    if (payload.formula) {
      formula = this._formulaService.initializeFormula(payload.formula);
    }
    if (payload.formulaId) {
     formula = this._formulaService.getFormula(payload.formulaId);
    }
    if (!formula) {
      throw new Error("Cannot find formula");
    }

    // const initiatorStats = initiator.calculateStatistics();
    // const targetStats = target.calculateStatistics();

    // const result = formula.calculate(initiatorStats, targetStats, payload.value);
    // formula.applyOutcome(target, result);
  }
  
}
