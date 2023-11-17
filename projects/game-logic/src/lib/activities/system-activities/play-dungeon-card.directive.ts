import { IDungeonCard } from "../../features/dungeon/dungeon-deck.interface";
import { resolveDealDamage } from "../../features/effects/deal-damage/deal-damage.effect";
import { IEffect, IEffectPayload } from "../../features/effects/effects-commons.interface";
import { EffectName } from "../../features/effects/effects.constants";
import { resolveModifyPosition } from "../../features/effects/modify-position/modify-position.effect";
import { resolveModifyStats } from "../../features/effects/modify-statistics/modify-statistics.effect";
import { resolveSpawnActor } from "../../features/effects/spawn-actor/spawn-actor.effect";
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
    if (effect.effectName === EffectName.DealDamage) {
      //resolveDealDamage(state.board, { effect, effectData: params }, effects);
    }

    if (effect.effectName === EffectName.SpawnActor) {
      resolveSpawnActor(state.board, { effect, effectData: params });
    }

    if (effect.effectName === EffectName.ModifyPosition) {
      resolveModifyPosition(state.board, { effect, effectData: params });
    }

    if (effect.effectName === EffectName.ModifyStats) {
      resolveModifyStats(state.board, { effect, effectData: params });
    }

    return [{
      name: SystemActivityName.PlayDungeonCard,
      payload: payload,
    }]
  }