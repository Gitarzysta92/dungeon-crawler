import { ICard } from "../../features/cards-deck/cards-deck.interface";
import { IEffectPayload } from "../../../../entities/effects/payload-definition.interface";
import { resolveEffect } from "../../../../entities/effects/resolve-effect";
import { IEffect } from "../../../../../framework/modules/effect/resolve-effect.interface";
import { DungeonGameplayLogicState } from "../../../../gameplay/state/dungeon/dungeon-gameplay";
import { IDispatcherDirective } from "../../../../../framework/base/state/state.interface";
import { SystemActivityName } from "../activity.constants";

export const playDungeonCard = (cardPayload: { card: ICard<IEffect>, effectPayload: IEffectPayload }): IDispatcherDirective =>
  async (state: DungeonGameplayLogicState) => {

    state.deck.addCardToUtilized(cardPayload.card);

    const { effect, payload } = cardPayload.effectPayload;

    if (effect.requiredPayload && !payload) {
      throw new Error("Cannot find associated params")
    }
    
    const effects = state.getAllEffects();
    const signature = resolveEffect(cardPayload.effectPayload, state.board, state.heroInventory, effects);

    return [{
      name: SystemActivityName.PlayDungeonCard,
      payload: payload,
      effectSignatures: signature
    }]
  }