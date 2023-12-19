import { DungeonGlobalState } from "../../gameplay/dungeon/dungeon-global-state"
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface"
import { DungeonActivityName, SystemActivityName } from "../constants/activity-name"

export const finishDungeonTurn = (): IDispatcherDirective =>
  async (state: DungeonGlobalState) => {

    state.isDungeonTurn = false;
    return [{
      name: SystemActivityName.FinishDungeonTurn,
      payload: {},
    }]
  }
