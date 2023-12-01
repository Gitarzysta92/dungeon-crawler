import { DungeonState } from "../../game/dungeon-state"
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface"
import { DungeonActivityName, SystemActivityName } from "../constants/activity-name"

export const finishDungeonTurn = (): IDispatcherDirective =>
  async (state: DungeonState) => {

    state.isDungeonTurn = false;
    return [{
      name: SystemActivityName.FinishDungeonTurn,
      payload: {},
    }]
  }
