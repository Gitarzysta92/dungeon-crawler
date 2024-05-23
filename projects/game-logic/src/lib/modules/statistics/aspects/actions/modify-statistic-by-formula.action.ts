
import { IActionDeclaration, IActionHandler } from "../../../../cross-cutting/action/action.interface";
import { ResolvableReference, Guid } from "../../../../infrastructure/extensions/types";
import { IStatisticBearer } from "../../entities/bearer/statistic-bearer.interface";
import { FormulaService } from "../../formula/formula.service";

export const MODIFY_STATISTIC_BY_FORMULA_ACTION = "MODIFY_STATISTIC_BY_FORMULA_ACTION";

export interface IModifyStatisticByFormulaActionPayload {
  value: number;
  initiator: ResolvableReference<IStatisticBearer>;
  target: ResolvableReference<IStatisticBearer>;
  formulaId: Guid;
}

export class ModifyStatisticByFormulaActionHandler implements IActionHandler<IModifyStatisticByFormulaActionPayload> {

  public delegateId = MODIFY_STATISTIC_BY_FORMULA_ACTION;

  constructor(
    private readonly _formulaService: FormulaService
  ) {}
  
  public isApplicableTo(m: IActionDeclaration<IModifyStatisticByFormulaActionPayload>): boolean {
    return this.delegateId === m.delegateId;
  }

  public process(payload: IModifyStatisticByFormulaActionPayload): void {
    const initiator = payload.initiator as IStatisticBearer;
    const target = payload.target as IStatisticBearer; 

    if (!target.isStatisticBearer || !initiator.isStatisticBearer) {
      throw new Error("Provided initiator and target are not StatisticBearers");
    }

    const formula = this._formulaService.getFormula(payload.formulaId);
    if (!formula) {
      throw new Error("Cannot find formula");
    }

    const initiatorStats = initiator.calculateStatistics();
    const targetStats = target.calculateStatistics();
      

    const result = formula.calculate(initiatorStats, targetStats, payload.value);
    formula.applyOutcome(target, result);
  }
  
}
