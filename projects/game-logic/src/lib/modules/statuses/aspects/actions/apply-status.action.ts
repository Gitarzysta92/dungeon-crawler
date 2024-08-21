import { IActionDeclaration, IActionHandler } from "../../../../cross-cutting/action/action.interface";
import { Guid, ResolvableReference } from "../../../../infrastructure/extensions/types";
import { IAffectableDeclaration } from "../../mixins/affectable/affectable.interface";


export const APPLY_STATUS_ACTION = "APPLY_STATUS_ACTION";

export interface IApplyStatusActionPayload {
  statusId: Guid;
  value: number;
  affectable: ResolvableReference<IAffectableDeclaration>;
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
