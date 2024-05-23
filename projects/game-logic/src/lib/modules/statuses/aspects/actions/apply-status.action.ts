import { IActionDeclaration, IActionHandler } from "../../../../cross-cutting/action/action.interface";
import { Guid, ResolvableReference } from "../../../../infrastructure/extensions/types";
import { IAffectable } from "../../entities/affectable/affectable.interface";
import { IAffector } from "../../statuses.interface";

export const APPLY_STATUS_ACTION = "APPLY_STATUS_ACTION";

export interface IApplyStatusActionPayload {
  statusId: Guid;
  value: number;
  affectable: ResolvableReference<IAffectable>;
  affector: ResolvableReference<IAffector>;
}

export class ModifyPositionActionHandler implements IActionHandler<IApplyStatusActionPayload> {

  public delegateId: string = APPLY_STATUS_ACTION;

  constructor() { }
  
  public isApplicableTo(m: IActionDeclaration<IApplyStatusActionPayload>): boolean {
    return this.delegateId === m.delegateId;
  }

  public async process(payload: IApplyStatusActionPayload): Promise<void> {

  }
  
}
