import { ICard } from "../../features/cards-deck/cards-deck.interface";
import { IEffectPayload } from "../../features/effects/payload-definition.interface";
import { resolveEffect } from "../../features/effects/resolve-effect";
import { IEffect } from "../../features/effects/resolve-effect.interface";
import { DungeonGlobalState } from "../../gameplay/dungeon/dungeon-global-state";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { SystemActivityName } from "../constants/activity-name";

export const playDungeonCard = (cardPayload: { card: ICard<IEffect>, effectPayload: IEffectPayload }): IDispatcherDirective =>
  async (state: DungeonGlobalState) => {

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