import { DungeonGameplay } from "../../dungeon/state/dungeon-gameplay";
import { DungeonActivityName } from "./activity.constants";
import { IActivityContext } from "./activity.interface";
import { AdventureGameplay } from "../../adventure/adventure-gameplay";
import { IAdventureGameplayFeed } from "../../adventure/adventure-gameplay.interface";
import { IDungeonGameplayFeed } from "../../dungeon/state/dungeon-gameplay.interface";
import { IDispatcherDirective } from "../../../lib/base/state/state.interface";
import { IInteractionSubject } from "../../../lib/cross-cutting/interaction/interaction.interface";
import { Ability } from "../../../lib/modules/ability/ability";
import { AbilityPerformer } from "../../../lib/modules/ability/performer/ability-performer";
import { Actor } from "../../../lib/modules/actor/actor";
import { CAST_EFFECT_INTERACTION_IDENTIFIER } from "../../../lib/modules/effect/aspects/interactions/cast-effect.interaction";
import { InventoryBearer } from "../../../lib/modules/item/bearer/inventory-bearer";
import { Item } from "../../../lib/modules/item/item";
import { Effect } from "../../../lib/modules/effect/effect";
import { IItem } from "../../../lib/modules/item/item.interface";
import { IAbility } from "../../../lib/modules/ability/ability.interface";


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

    const result = state.effectsService.finishCasting(effect);

    return { name: DungeonActivityName.CastEffect }
  }
