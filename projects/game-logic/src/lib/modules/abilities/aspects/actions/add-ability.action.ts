
import { IActionDeclaration, IActionHandler } from "../../../../cross-cutting/action/action.interface";
import { Guid, ResolvableReference } from "../../../../infrastructure/extensions/types";
import { AbilitiesService } from "../../abilities.service";
import { IAbilityPerformer } from "../../entities/performer/ability-performer.interface";


export const ADD_ABILITY_ACTION_IDENTIFIER = "ADD_ABILITY_ACTION_IDENTIFIER";

export interface IAddAbilityActionPayload {
  id: ResolvableReference<Guid>;
  performer: ResolvableReference<IAbilityPerformer>;
}

export class AddAbilityAction implements IActionHandler<IAddAbilityActionPayload> {

  public delegateId = ADD_ABILITY_ACTION_IDENTIFIER;

  constructor(
    private readonly _abilitiesService: AbilitiesService
  ) { }


  public isApplicableTo(m: IActionDeclaration<IAddAbilityActionPayload>): boolean {
    return this.delegateId === m.delegateId;
  }

  public canBeProcessed(payload: IAddAbilityActionPayload): boolean {
    return true;
  }

  public async process(payload: IAddAbilityActionPayload): Promise<void> {    
    await this._abilitiesService.addAbility(payload.id, payload.performer as IAbilityPerformer);
  }

}