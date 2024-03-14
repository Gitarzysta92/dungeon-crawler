import { IActionHandler, IActionDeclaration } from "../../../../cross-cutting/action/action.interface";
import { Guid } from "../../../../extensions/types";

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

  public async process(payload: IUnlockAreaActionPayload): Promise<void> {

  }

}