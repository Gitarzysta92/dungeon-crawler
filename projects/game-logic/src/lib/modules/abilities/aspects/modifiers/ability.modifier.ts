import { IModifierDeclaration } from "../../../../cross-cutting/modifier/modifier.interface";
import { Guid, ResolvableReference } from "../../../../infrastructure/extensions/types";
import { IAbilityPerformer } from "../../entities/performer/ability-performer.interface";

export const ABILITY_MODIFIER = "ABILITY_MODIFIER"; 

export interface IAbilityModifierPayload {
  abilityId: Guid,
  parameter: string,
  value: number,
  performer: ResolvableReference<IAbilityPerformer>
}

export class AbilityModifierHandler {
  delegateId = ABILITY_MODIFIER
  
  constructor() { }
  
  public isApplicableTo(d: IModifierDeclaration) {
    return d.delegateId === this.delegateId;
  }

  public async process(p: IAbilityModifierPayload): Promise<void> {
    //(p.performer as IAbilityPerformer).
  }

}