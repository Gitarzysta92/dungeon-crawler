import { IDelegateDeclaration } from "../../../../base/delegate/delegate.interface";
import { IActionDefaultPayload, IActionHandler } from "../../../../cross-cutting/action/action.interface";
import { IStatisticBearer } from "../../bearer/statistic-bearer.interface";

export const MODIFY_STATISTIC_ACTION_IDENTIFIER = "MODIFY_STATISTIC_ACTION_IDENTIFIER";

export interface IModifyStatisticActionPayload extends IActionDefaultPayload {
  value: number;
  statisticId: string;
  modiferValue: number;
  target: IStatisticBearer<[]>;
  modifierType: 'add' | 'substract';
}

export class ModifyStatisticActionHandler implements IActionHandler<IModifyStatisticActionPayload> {
  delegateId = MODIFY_STATISTIC_ACTION_IDENTIFIER;

  constructor() { }


  prepare: (ctx: unknown, d: IModifyStatisticActionPayload) => IModifyStatisticActionPayload;

  public isApplicableTo(d: IDelegateDeclaration<IModifyStatisticActionPayload>): boolean {
    return d.payload.target?.isStatisticBearer;
  }

  public process() {

  }
}