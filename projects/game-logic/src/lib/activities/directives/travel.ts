import { IArea } from "../../features/adventure/area.interface";
import { AdventureState } from "../../game/adventure-state";
import { IGameFeed } from "../../game/game.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { AdventureActivityName } from "../constants/activity-name";

export const travel = (payload: { targetArea: IArea }): IDispatcherDirective =>
  (state: AdventureState, feed: IGameFeed) => {
    
    if (state.adventureMap.occupiedAreaId === payload.targetArea.id) {
      throw new Error('You are already in given area');
    }

    const connection = payload.targetArea.areaConnections.find(a => a.fromAreaId === state.adventureMap.occupiedAreaId)
    if (!connection) {
      throw new Error('There is no connection to given area');
    }

    if (!state.adventureMap.validateAreaAccessibility(payload.targetArea)) {
      throw new Error('Your hero does not matching access conditions for given area');
    }

    state.adventureMap.travelTo(payload.targetArea);

    return [{
      name: AdventureActivityName.Travel,
      payload: payload,
    }]
  }