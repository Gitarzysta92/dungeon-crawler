import { IDispatcherDirective } from "../../../../helpers/dispatcher/state.interface";
import { DungeonGameplayLogicState } from "../../../../gameplay/modules/dungeon/mixins/dungeon-state/dungeon-state.factory"

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
