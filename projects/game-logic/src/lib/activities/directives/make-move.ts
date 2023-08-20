import { IBoardCoordinates, IBoardObjectRotation, IBoardSelector } from "../../features/board/board.interface";
import { EffectName } from "../../features/effects/effects.constants";
import { IModifyPosition } from "../../features/effects/effects.interface";
import { moveActors } from "../../features/effects/move-actors.effect";
import { resolveCostAndInteraction } from "../../features/interactions/interactions";
import { IDisposable, IReusable } from "../../features/interactions/interactions.interface";
import { DungeonState } from "../../game/dungeon-state";
import { IGameFeed } from "../../game/game.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { AdventureActivityName } from "../constants/activity-name";


export const makeMove = (payload: {
  setup: IModifyPosition & IBoardSelector & (IReusable | IDisposable),
  to: IBoardCoordinates,
  rotation?: IBoardObjectRotation
}): IDispatcherDirective =>
  (state: DungeonState, feed: IGameFeed) => {
    
    const hero = state.board.getObjectById(state.hero.id);
    if (!hero) {
      throw new Error("Cannot move hero because it is not on the board")
    }

    if (payload.setup.effectName !== EffectName.ModifyPosition) {
      throw new Error("Provied effect is not supported by make move directive")
    }

    resolveCostAndInteraction(payload.setup, state.hero, true);

    payload.setup.allowedMaxDistance = payload.setup.selectorRange = state.hero.speed;
    moveActors(state.board, payload.setup, [
      { coords: payload.to, actorId: state.hero.id, rotation: payload.rotation || hero.rotation }
    ]);

    return [{
      name: AdventureActivityName.BuyItem,
      payload: payload,
    }]
  }