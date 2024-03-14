import { IModifierDeclaration, IModifierHandler } from "../../../../cross-cutting/modifier/modifier.interface";

export const STATISTIC_MODIFIER = "STATISTIC_MODIFIER"; 

export interface IStatisticModifierPayload {

}

export class StatisticModifierHandler implements IModifierHandler<IStatisticModifierPayload> {
  delegateId = STATISTIC_MODIFIER;

  constructor() { }

  public isApplicableTo(d: IModifierDeclaration<IStatisticModifierPayload>) {
    return d.delegateId === this.delegateId;
  }

  public async process(p: IStatisticModifierPayload): Promise<void> {
    
  }

}