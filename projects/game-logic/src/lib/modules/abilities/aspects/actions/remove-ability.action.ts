import { IActionDeclaration, IActionHandler } from "../../../../cross-cutting/action/action.interface";
import { ResolvableReference } from "../../../../infrastructure/extensions/types";
import { IAbility } from "../../entities/ability/ability.interface";
import { IAbilityPerformer } from "../../entities/performer/ability-performer.interface";


export const REMOVE_ABILITY_ACTION_IDENTIFIER = "REMOVE_ABILITY_ACTION_IDENTIFIER";

export interface IAddAbilityActionPayload {
  ability: ResolvableReference<IAbility>;
  performer: ResolvableReference<IAbilityPerformer>;
}

export class RemoveAbilityAction implements IActionHandler<IAddAbilityActionPayload> {

  public delegateId = REMOVE_ABILITY_ACTION_IDENTIFIER;

  constructor() { }


  public isApplicableTo(m: IActionDeclaration<IAddAbilityActionPayload>): boolean {
    return this.delegateId === m.delegateId;
  }

  public canBeProcessed(payload: IAddAbilityActionPayload): boolean {
    return true;
  }

  public async process(payload: IAddAbilityActionPayload): Promise<void> {    
    (payload.performer as IAbilityPerformer).removeAbility(payload.ability as IAbility);
  }

}