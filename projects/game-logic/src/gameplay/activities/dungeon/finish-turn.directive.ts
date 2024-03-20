import { IDispatcherDirective } from "../../../../../framework/base/state/state.interface"
import { DungeonActivityName } from "../activity.constants"
import { DungeonGameplay } from "../../state/dungeon/dungeon-gameplay";


export const finishTurn = (): IDispatcherDirective =>
  async (state: DungeonGameplay) => {
    
    state.effectsService.updateLastingEffects(state.gameplayService.round);
    state.gameplayService.finishTurn();
    
    return [{
      name: DungeonActivityName.FinishTurn,
    }]
  }