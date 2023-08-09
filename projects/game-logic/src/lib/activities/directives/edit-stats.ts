import { IBasicStats } from "../../features/actors/actor";
import { AdventureState } from "../../game/adventure-state";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { AdventureActivityName } from "../constants/activity-name";


export const editStats = (payload: { stats: IBasicStats }): IDispatcherDirective =>
  function (state: AdventureState) {

    Object.assign(state.hero, payload.stats);

    return [{
      name: AdventureActivityName.EditStats,
      payload: payload
    }]
  }