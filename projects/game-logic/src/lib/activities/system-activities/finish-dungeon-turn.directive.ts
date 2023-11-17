import { DungeonState } from "../../game/dungeon-state"
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface"
import { DungeonActivityName } from "../constants/activity-name"

export const finishDungeonTurn = (): IDispatcherDirective =>
  async (state: DungeonState) => {

    return [{
      name: DungeonActivityName.FinishTurn,
      payload: {},
    }]
  }
