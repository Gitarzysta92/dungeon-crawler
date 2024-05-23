
import { IActionDeclaration, IActionHandler } from "../../../../cross-cutting/action/action.interface";
import { ResolvableReference } from "../../../../infrastructure/extensions/types";
import { IPerkBearer } from "../../entities/perk-bearer/perk-bearer.interface";
import { IPerk } from "../../perk.interface";

export const UNLOCK_PERK_ACTION = "UNLOCK_PERK_ACTION";

export interface IUnlockPerkActionPayload {
  bearer: ResolvableReference<IPerkBearer>;
  perk: IPerk;
}

export class UnlockPerkAction implements IActionHandler<IUnlockPerkActionPayload> {

  public delegateId = UNLOCK_PERK_ACTION;

  constructor() { }


  public isApplicableTo(m: IActionDeclaration<IUnlockPerkActionPayload>): boolean {
    return this.delegateId === m.delegateId;
  }

  public process(payload: IUnlockPerkActionPayload): void {    
    (payload.bearer as IPerkBearer).unlock(payload.perk);
  }

}