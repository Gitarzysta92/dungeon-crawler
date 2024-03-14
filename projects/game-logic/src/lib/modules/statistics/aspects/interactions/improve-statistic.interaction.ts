import { IInteractionDeclaration, IInteractionHandler } from "../../../../cross-cutting/interaction/interaction.interface";
import { IStatisticBearer } from "../../entities/bearer/statistic-bearer.interface";
import { IStatistic } from "../../entities/statistic/statistic.interface";


export const IMPROVE_STATISTIC_INTERACTION = "IMPROVE_STATISTIC_INTERACTION"

export interface IImproveStatisticInteraction extends IInteractionDeclaration {
  id: typeof IMPROVE_STATISTIC_INTERACTION,
  value: number;
}

export class ImproveStatisticInteractionHandler implements IInteractionHandler {
  
  delegateId = IMPROVE_STATISTIC_INTERACTION;

  isApplicableTo(d: IInteractionDeclaration): boolean {
    return this.delegateId === d.delegateId;
  }

  public resolveInteraction(b: IStatisticBearer, s: IStatistic, i: IImproveStatisticInteraction): boolean {
    if (s.bearer !== b) {
      return false;
    } 
    s.improve(i.value);
  }
}