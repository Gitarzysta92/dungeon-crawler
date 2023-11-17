import { DungeonState } from "../../game/dungeon-state";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { SystemActivityName } from "../constants/activity-name";

export const startDungeonTurn = (): IDispatcherDirective =>
  async (state: DungeonState) => {

    return [{
      name: SystemActivityName.StartDungeonTurn,
      payload: {},
    }]
  }
