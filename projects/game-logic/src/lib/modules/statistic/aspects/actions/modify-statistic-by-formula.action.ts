import { IDelegateDeclaration } from "../../../../base/delegate/delegate.interface";
import { IActionDefaultPayload, IActionHandler } from "../../../../cross-cutting/action/action.interface";
import { JsonPathResolver } from "../../../../extensions/json-path";
import { ResolvableReference } from "../../../../extensions/types";
import { ValidationError } from "../../../../extensions/validation-error";
import { IStatisticBearer } from "../../bearer/statistic-bearer.interface";
import { ModifyStatisticByFormulaActionPayload } from "../../formula/modify-statistic-by-formula.payload";
import { IStatisticModificationFormulaDefinition } from "../../formula/modify-statistic-formula.interface";


export const MODIFY_STATISTIC_BY_FORMULA_ACTION_IDENTIFIER = "MODIFY_STATISTIC_BY_FORMULA_ACTION_IDENTIFIER";

export interface IModifyStatisticByFormulaActionPayload extends IActionDefaultPayload {
  value: number;
  initiator: ResolvableReference<IStatisticBearer<[]>>;
  target: ResolvableReference<IStatisticBearer<[]>>;
  formula?: IStatisticModificationFormulaDefinition;
  tags?: string[];
}

export class ModifyStatisticByFormulaActionHandler implements IActionHandler<IModifyStatisticByFormulaActionPayload> {

  public delegateId: string = MODIFY_STATISTIC_BY_FORMULA_ACTION_IDENTIFIER;

  constructor() { }
  
  public isApplicableTo(m: IDelegateDeclaration<IModifyStatisticByFormulaActionPayload>): boolean {
    return this.delegateId === m.delegateId;
  }

  public prepare(
    d: IModifyStatisticByFormulaActionPayload,
    ctx: unknown
  ): ModifyStatisticByFormulaActionPayload {
    return new ModifyStatisticByFormulaActionPayload(JsonPathResolver.resolve(d, ctx));
  };

  public async process(payload: ModifyStatisticByFormulaActionPayload): Promise<void> {
    const { initiator, target, formula } = payload;
    const initiatorStats = initiator.getCalculatedStatisticClone();
    const targetStats = target.getCalculatedStatisticClone();
       
    if (!formula.isValid()) {
      throw new ValidationError()
    }

    formula.calculate(initiatorStats, targetStats);
    formula.applyOutcome(payload.target);
  }
  
}
