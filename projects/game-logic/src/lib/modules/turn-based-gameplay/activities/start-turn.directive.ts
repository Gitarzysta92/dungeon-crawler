import { IDispatcherDirective } from "../../../base/state/state.interface";
import { DungeonGameplayLogicState } from "../../../../gameplay/state/dungeon/dungeon-gameplay"

import { DungeonActivityName } from "../activity.constants"

export const startTurn = (): IDispatcherDirective =>
  async (state: DungeonGameplayLogicState) => {

    

    state.turn += 1;
    state.hero.regainActions();
    state.deck.takeCards();

    return {
      name: DungeonActivityName.StartTurn,
      payload: {},
    }
  }
