import { EffectOwner } from "../../features/effects/effects.constants"
import { DungeonState } from "../../game/dungeon-state"
import { IGameFeed } from "../../game/game.interface"
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface"
import { DungeonActivityName } from "../constants/activity-name"


export const finishTurn = (): IDispatcherDirective =>
  (state: DungeonState, feed: IGameFeed) => {
    
    state.effects = state.effects
      .filter(e => e.owner === EffectOwner.Hero && e.durationInTurns + e.deploymentTurn > state.turn);
    
    state.turn += 1;
    
    return [{
      name: DungeonActivityName.FinishTurn,
      payload: {},
    }]
  }