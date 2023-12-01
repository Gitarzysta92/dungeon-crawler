import { IDungeonState } from "@game-logic/lib/game/game.interface";
import { IDungeonInteractionState } from "../interfaces/interaction-state.interface";


export function mapDungeonStateToInteractionState(d: IDungeonState): IDungeonInteractionState {
  return { payloadDefinitions: [], collectedData: [] } as IDungeonInteractionState;
}