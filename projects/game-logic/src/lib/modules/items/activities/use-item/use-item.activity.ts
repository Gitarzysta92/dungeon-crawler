import { DungeonGameplayLogicState } from "../../../../../gameplay/state/dungeon/dungeon-gameplay";
import { IActivityContext } from "../../../../base/activity/activity.interface";
import { IDungeonGameplayFeed } from "../../../../../gameplay/state/dungeon/dungeon-gameplay.interface";
import { IDispatcherDirective } from "../../../../base/state/state.interface";
import { IActivitySubject } from "../../../../base/activity/activity.interface";

import { IItem } from "../../entities/item/item.interface";
import { IAbility } from "../../../abilities/entities/ability/ability.interface";
import { AdventureGameplayLogicState } from "../../../../../gameplay/state/adventure/adventure-gameplay";
import { IAdventureGameplayFeed } from "../../../../../gameplay/state/adventure/adventure-gameplay.interface";


export class CastEffectActivity implements IActivity {

  public validate() {

  }

  public perform(effect: Effect & IActivitySubject & Partial<Ability> & Partial<Item>): IDispatcherDirective {
    return async (
      state: AdventureGameplayLogicState | DungeonGameplayLogicState,
      context: IActivityContext<IAdventureGameplayFeed | IDungeonGameplayFeed>
    ) => {
  
      const actor = state.actorsService
        .getActor<Actor & Partial<AbilityPerformer> & Partial<InventoryBearer>>(context.getControlledActorId());
      if (!actor.isInGroup(context.authority.groupId)) {
        throw new Error();
      }
  
      if (effect.isAbility && !actor?.isAbleToUseAbility(effect as IAbility)) {
        throw new Error();
      }
  
      if (effect.isItem && !actor?.isAbleToUseItem(effect as IItem)) {
        throw new Error() 
      }
  
      if (effect.isAbility) {
        effect.calculateAbilityParameters()
      }
      
      state.interactionService.resolveInteraction(CAST_EFFECT_INTERACTION_IDENTIFIER, effect, actor);
  
      return { name: DungeonActivityName.CastEffect }
    }  
  }
}