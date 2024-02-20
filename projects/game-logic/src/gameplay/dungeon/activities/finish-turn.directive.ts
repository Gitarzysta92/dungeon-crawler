import { IDispatcherDirective } from "../../../../../framework/base/state/state.interface"
import { DungeonActivityName } from "../../shared/activities/activity.constants"
import { DungeonGameplay } from "../state/dungeon-gameplay";


export const finishTurn = (): IDispatcherDirective =>
  async (state: DungeonGameplay) => {
    
    state.effectsService.updateLastingEffects(state.gameplayService.round);
    state.gameplayService.finishTurn();
    
    return [{
      name: DungeonActivityName.FinishTurn,
    }]
  }