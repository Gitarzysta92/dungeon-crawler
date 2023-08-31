import { DungeonState } from "../../game/dungeon-state";
import { IGameFeed } from "../../game/game.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { SystemActivityName } from "../constants/activity-name";
import { castEffect } from "../player-activities/cast-effect.directive";

export interface UseEffectPayload {
  effect: IEffect & (IReusable | IDisposable) & IBoardSelector,
  targets?: (IEnemy & IBoardObject)[] | SpawnDeclaration[] | MoveDeclaration[] 
}

export const makeDungeonTurn = (payload?: { params: [] }): IDispatcherDirective =>
  (state: DungeonState, feed: IGameFeed) => {
     
    var activities = state.deck.cardsToUtilize.reduce((activities, card) => {
      return activities.concat(card.effects.map(e => {
        const params = payload?.params.find(p => p.id === e.id) || generateParamsForEffect(e)

        if (effect.isRequired() && !params) {
          throw new Error(`There are no provided payload for effect: ${e.id}`)
        }

        const activity = castEffect({ effect: e, target: params })(state, feed);
        state.deck.addCardToUtilized(card);
        return activity;
      }))
    }, [] as any);

    return [{
      name: SystemActivityName.MakeDungeonTurn,
      payload: payload,
      nested: activities
    }]
  }


function generateParamsForEffect(): any {
    
  }