import { disposeLastingEffects } from "../../features/effects/effects-commons"
import { ILastingEffect } from "../../features/effects/effects.interface"
import { DungeonState } from "../../game/dungeon-state"
import { IGameFeed } from "../../game/game.interface"
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface"
import { DungeonActivityName } from "../constants/activity-name"


export const finishTurn = (): IDispatcherDirective =>
  async (state: DungeonState, feed: IGameFeed) => {
    
    disposeLastingEffects(state.getAllEffects() as unknown as ILastingEffect[], state.turn);
    state.isDungeonTurn = true;
    
    return [{
      name: DungeonActivityName.FinishTurn,
    }]
  }