import { resolveDealDamage } from "../../features/effects/deal-damage/deal-damage.effect";
import { IEffect, IEffectPayload } from "../../features/effects/effects-commons.interface";
import { EffectName } from "../../features/effects/effects.constants";
import { resolveModifyPosition } from "../../features/effects/modify-position/modify-position.effect";
import { resolveModifyStats } from "../../features/effects/modify-statistics/modify-statistics.effect";
import { resolveSpawnActor } from "../../features/effects/spawn-actor/spawn-actor.effect";
import { DungeonState } from "../../game/dungeon-state";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { SystemActivityName } from "../constants/activity-name";


export interface IDungeonCardEffect {
  effectData: IEffectPayload;
}

export const makeDungeonTurn = (payload?: { params: IDungeonCardEffect[] }): IDispatcherDirective =>
  async (state: DungeonState) => {

    const activities = state.deck.cardsToUtilize.reduce((activities, card) => {
      state.deck.addCardToUtilized(card);

      return activities.concat(card.effect.map(effect => {
        const cardEffect = payload?.params.find(p => p.effectData.effectId === effect.id) || generateParamsForEffect(state, effect as IEffect)!;

        if (effect.requiredPayload && !cardEffect) {
          throw new Error("Cannot find associated")
        }

        const effects = state.getAllEffects();
        if (effect.effectName === EffectName.DealDamage) {
          resolveDealDamage(state.board, { effect, effectData: cardEffect.effectData }, effects);
        }

        if (effect.effectName === EffectName.SpawnActor) {
          resolveSpawnActor(state.board, { effect, effectData: cardEffect.effectData });
        }

        if (effect.effectName === EffectName.ModifyPosition) {
          resolveModifyPosition(state.board, { effect, effectData: cardEffect.effectData });
        }

        if (effect.effectName === EffectName.ModifyStats) {
          resolveModifyStats(state.board, { effect, effectData: cardEffect.effectData });
        }

        return {} as any;
      }));
    }, [] as any);

    return [{
      name: SystemActivityName.MakeDungeonTurn,
      payload: payload,
      nested: activities
    }]
  }


function generateParamsForEffect(state: DungeonState, effect: IEffect): IDungeonCardEffect {
  return {} as IDungeonCardEffect;
}

