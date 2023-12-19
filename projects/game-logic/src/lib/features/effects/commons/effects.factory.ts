import { IDungeonGlobalState } from "../../../gameplay/dungeon/dungeon-global-state.interface";
import { EffectsStateHandler } from "./effects-state-handler/effects.state-handler";

export class EffectsFactory {
  public static initializeEffectsState(initialData: IDungeonGlobalState): EffectsStateHandler {
    return {} as EffectsStateHandler;
  }

}