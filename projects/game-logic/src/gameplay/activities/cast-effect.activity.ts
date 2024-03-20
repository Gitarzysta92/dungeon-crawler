import { DungeonGameplay } from "../state/dungeon/dungeon-gameplay";
import { DungeonActivityName } from "./activity.constants";
import { IActivityContext } from "./activity.interface";
import { IDungeonGameplayFeed } from "../state/dungeon/dungeon-gameplay.interface";
import { IDispatcherDirective } from "../../lib/base/state/state.interface";
import { IInteractionSubject } from "../../lib/cross-cutting/interaction/interaction.interface";
import { Ability } from "../../../lib/modules/abilities/entities/ability/ability";
import { AbilityPerformer } from "../../../lib/modules/abilities/entities/performer/ability-performer";
import { Actor } from "../../../lib/modules/actors/entities/actor/actor";
import { CAST_EFFECT_INTERACTION_IDENTIFIER } from "../../lib/modules/effects/aspects/interactions/cast-effect.interaction";
import { InventoryBearer } from "../../lib/modules/items/entities/bearer/inventory-bearer.factory";
import { Item } from "../../lib/modules/items/entities/item/item.factory";
import { Effect } from "../../../lib/modules/effects/effect";
import { IItem } from "../../lib/modules/items/entities/item/item.interface";
import { IAbility } from "../../lib/modules/abilities/entities/ability/ability.interface";
import { AdventureGameplay } from "../state/adventure/adventure-gameplay";
import { IAdventureGameplayFeed } from "../state/adventure/adventure-gameplay.interface";


export const castEffect = (effect: Effect & IInteractionSubject & Partial<Ability> & Partial<Item>): IDispatcherDirective =>
  async (
    state: AdventureGameplay | DungeonGameplay,
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
