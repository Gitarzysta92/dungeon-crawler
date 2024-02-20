import { IModificable, IModifierDeclaration, IModifierHandler } from "../../../../cross-cutting/modifier/modifier.interface";
import { StatisticBearer } from "../../bearer/statistic-bearer";

export const STATISTIC_MODIFIER_HANDLER_IDENTIFIER = "STATISTIC_MODIFIER_HANDLER_IDENTIFIER"; 


export class StatisticModifierHandler implements IModifierHandler {
  delegateId = STATISTIC_MODIFIER_HANDLER_IDENTIFIER;
  payload?: unknown;
  
  private _declaration: any;

  constructor() { }
  process: (m: IModificable) => Promise<void>;
  isApplicableTo: (d: IModifierDeclaration<unknown>) => boolean;
  prepare: (ctx: unknown, d: unknown) => unknown;

  public isApplicable(bearer: StatisticBearer) {
    return bearer?.isStatisticBearer;
  }

}