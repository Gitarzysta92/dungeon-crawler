import { IDungeonCard } from "../../features/dungeon/dungeon-deck.interface";
import { IEffect, IEffectPayload } from "../../features/effects/effects-commons.interface";
import { resolveEffect } from "../../features/effects/resolve-effect";
import { DungeonState } from "../../game/dungeon-state";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { SystemActivityName } from "../constants/activity-name";

export const playDungeonCard = (payload: { card: IDungeonCard<IEffect>, params: IEffectPayload }): IDispatcherDirective =>
  async (state: DungeonState) => {

    state.deck.addCardToUtilized(payload.card);

    const effect = payload.card.effect;
    const params = payload.params;

    if (effect.requiredPayload && !params) {
      throw new Error("Cannot find associated params")
    }

    const effects = state.getAllEffects();
    resolveEffect(effect, params, {} as any, state.board, state.heroInventory, effects);

    return [{
      name: SystemActivityName.PlayDungeonCard,
      payload: payload,
    }]
  }