import { DungeonGlobalState } from "../../gameplay/dungeon/dungeon-global-state";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { SystemActivityName } from "../constants/activity-name";

export const startDungeonTurn = (): IDispatcherDirective =>
  async (state: DungeonGlobalState) => {

    state.turn += 1;
    state.isDungeonTurn = true;
    
    return [{
      name: SystemActivityName.StartDungeonTurn,
      payload: {},
    }]
  }
