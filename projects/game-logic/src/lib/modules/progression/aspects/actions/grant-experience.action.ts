import { IActionDeclaration, IActionHandler } from "../../../../cross-cutting/action/action.interface";
import { ResolvableReference } from "../../../../infrastructure/extensions/types";
import { IProgressable } from "../../entities/progressable.interface";

export const GRANT_EXPERIENCE = "GRANT_EXPERIENCE";

export interface IGrantExperienceActionPayload {
  progressable: ResolvableReference<IProgressable>;
  expNumber: number;
}

export class GrantExperienceAction implements IActionHandler<IGrantExperienceActionPayload> {

  public delegateId = GRANT_EXPERIENCE;

  constructor( ) { }

  public isApplicableTo(m: IActionDeclaration<IGrantExperienceActionPayload>): boolean {
    return this.delegateId === m.delegateId;
  }

  public canBeProcessed(payload: IGrantExperienceActionPayload): boolean {
   return true
  }

  public async process(payload: IGrantExperienceActionPayload): Promise<void> {
    (payload.progressable as IProgressable).gainExperience(payload.expNumber);
  }

}