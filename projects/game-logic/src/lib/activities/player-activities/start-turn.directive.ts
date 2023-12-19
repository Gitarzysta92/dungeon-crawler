import { DungeonGlobalState } from "../../gameplay/dungeon/dungeon-global-state"
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface"
import { DungeonActivityName } from "../constants/activity-name"

export const startTurn = (): IDispatcherDirective =>
  async (state: DungeonGlobalState) => {

    state.turn += 1;
    state.hero.regainActions();
    state.deck.takeCards();

    return [{
      name: DungeonActivityName.StartTurn,
      payload: {},
    }]
  }
