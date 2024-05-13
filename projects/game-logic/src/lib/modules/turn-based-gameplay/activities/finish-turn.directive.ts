import { IDispatcherDirective } from "../../../../../framework/base/state/state.interface"
import { DungeonActivityName } from "../activity.constants"
import { DungeonGameplayLogicState } from "../../../../gameplay/modules/dungeon/mixins/dungeon-state/dungeon-state.factory";


export const finishTurn = (): IDispatcherDirective =>
  async (state: DungeonGameplayLogicState) => {
    
    state.effectsService.updateLastingEffects(state.gameplayService.round);
    state.gameplayService.finishTurn();
    
    return [{
      name: DungeonActivityName.FinishTurn,
    }]
  }