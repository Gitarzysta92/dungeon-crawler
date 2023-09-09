import { IEnemy } from "../../features/actors/actors.interface";
import { resolveEffect } from "../../features/effects/effect-commons";
import { IEffect, IEffectPayload } from "../../features/effects/effect-commons.interface";
import { DungeonState } from "../../game/dungeon-state";
import { IGameFeed } from "../../game/game.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { SystemActivityName } from "../constants/activity-name";



export interface IDungeonCardEffect {
  effectData: IEffectPayload;
  originActor?: IEnemy;
}

export const makeDungeonTurn = (payload?: { params: IDungeonCardEffect[] }): IDispatcherDirective =>
  (state: DungeonState, feed: IGameFeed) => {

    const activities = state.deck.cardsToUtilize.reduce((activities, card) => {
      state.deck.addCardToUtilized(card);

      return activities.concat(card.effects.map(effect => {
        const cardEffect = payload?.params.find(p => p.effectData.effectId === effect.id) || generateParamsForEffect(state, effect as IEffect)!;

        if (effect.requiredPayload && !cardEffect) {
          throw new Error("Cannot find associated")
        }

        resolveEffect(state.board, { effect, effectData: cardEffect.effectData }, state.getAllEffects(), cardEffect.originActor)
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