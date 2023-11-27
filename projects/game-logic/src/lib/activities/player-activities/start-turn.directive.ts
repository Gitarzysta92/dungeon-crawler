import { DungeonState } from "../../game/dungeon-state"
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface"
import { DungeonActivityName } from "../constants/activity-name"

export const startTurn = (): IDispatcherDirective =>
  async (state: DungeonState) => {

    state.turn += 1;
    state.hero.regainActions();
    state.deck.takeCards();

    return [{
      name: DungeonActivityName.StartTurn,
      payload: {},
    }]
  }
