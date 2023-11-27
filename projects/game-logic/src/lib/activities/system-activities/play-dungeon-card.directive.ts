import { IDungeonCard } from "../../features/dungeon/dungeon-deck.interface";
import { IEffectPayload } from "../../features/effects/payload-definition.interface";
import { resolveEffect } from "../../features/effects/resolve-effect";
import { IEffect } from "../../features/effects/resolve-effect.interface";
import { DungeonState } from "../../game/dungeon-state";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { SystemActivityName } from "../constants/activity-name";

export const playDungeonCard = (cardPayload: { card: IDungeonCard<IEffect>, effectPayload: IEffectPayload }): IDispatcherDirective =>
  async (state: DungeonState) => {

    state.deck.addCardToUtilized(cardPayload.card);

    const { effect, payload } = cardPayload.effectPayload;

    if (effect.requiredPayload && !payload) {
      throw new Error("Cannot find associated params")
    }
    debugger;
    const effects = state.getAllEffects();
    resolveEffect(cardPayload.effectPayload, state.board, state.heroInventory, effects);

    return [{
      name: SystemActivityName.PlayDungeonCard,
      payload: payload,
    }]
  }