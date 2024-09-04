import { IActionDeclaration, IActionHandler } from "../../../../cross-cutting/action/action.interface";
import { Guid } from "../../../../infrastructure/extensions/types";

export const UNLOCK_AREA_ACTION = "UNLOCK_AREA_ACTION";

export interface IUnlockAreaActionPayload {
  areaId: Guid;
}

export class UnlockAreaAction implements IActionHandler<IUnlockAreaActionPayload> {

  public delegateId = UNLOCK_AREA_ACTION;

  constructor( ) { }


  public isApplicableTo(m: IActionDeclaration<IUnlockAreaActionPayload>): boolean {
    return this.delegateId === m.delegateId;
  }
  
  public canBeProcessed(payload: IUnlockAreaActionPayload): boolean {
    return true;
  }

  public async process(payload: IUnlockAreaActionPayload): Promise<void> {

  }

}