import { disposeLastingEffects } from "../../features/effects/commons/effects-commons"
import { ILastingEffect } from "../../features/effects/commons/effect.interface"
import { DungeonGameplayState } from "../../gameplay/dungeon/dungeon-global-state"
import { IGameFeed } from "../../states/game.interface"
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface"
import { DungeonActivityName } from "../constants/activity-name"


export const finishTurn = (): IDispatcherDirective =>
  async (state: DungeonGameplayState, feed: IGameFeed) => {
    
    disposeLastingEffects(state.getAllEffects() as unknown as ILastingEffect[], state.turn);
    state.isDungeonTurn = true;
    
    return [{
      name: DungeonActivityName.FinishTurn,
    }]
  }