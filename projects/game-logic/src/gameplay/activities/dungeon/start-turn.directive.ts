import { DungeonGameplay } from "../../state/dungeon/dungeon-gameplay"
import { IDispatcherDirective } from "../../../../../framework/base/state/state.interface"
import { DungeonActivityName } from "../activity.constants"

export const startTurn = (): IDispatcherDirective =>
  async (state: DungeonGameplay) => {

    state.turn += 1;
    state.hero.regainActions();
    state.deck.takeCards();

    return [{
      name: DungeonActivityName.StartTurn,
      payload: {},
    }]
  }
