import { DungeonState } from "../../states/dungeon-state";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { SystemActivityName } from "../constants/activity-name";

export const startDungeonTurn = (): IDispatcherDirective =>
  async (state: DungeonState) => {

    state.turn += 1;
    state.isDungeonTurn = true;
    
    return [{
      name: SystemActivityName.StartDungeonTurn,
      payload: {},
    }]
  }
