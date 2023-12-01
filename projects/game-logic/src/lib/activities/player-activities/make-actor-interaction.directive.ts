import { ActorType } from "../../features/actors/actors.constants";
import { IActor } from "../../features/actors/actors.interface";
import { IBoardCoordinates, IBoardObject } from "../../features/board/board.interface";
import { resolveCostAndInteraction } from "../../features/interactions/interactions";
import { IReusable } from "../../features/interactions/interactions.interface";
import { DungeonState } from "../../states/dungeon-state";
import { IGameFeed } from "../../states/game.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { DungeonActivityName } from "../constants/activity-name";

export const makeActorInteraction = (payload: { actorId: string }): IDispatcherDirective =>
  async (state: DungeonState, feed: IGameFeed) => {
    

    return [{
      name: DungeonActivityName.MakeActorInteraction,
      payload: payload,
    }]
  }


export const validatePossibilityToInteractActor = (state: DungeonState, payload: { actorId: string }, customPostition?: IBoardCoordinates) => {
  if (!state.hero.position) {
    throw new Error("");
  }
  const actors = state.board.getAdjencedObjects<IActor & IReusable & IBoardObject>(customPostition ?? state.hero.position);
  const targetActor = actors.find(a => a.id === payload.actorId);

  if (!targetActor) {
    return false;
  }

  if (![ActorType.DungeonExit, ActorType.Treasure, ActorType.Character].includes(targetActor.actorType)) {
    return false
  }

  try {
    resolveCostAndInteraction(targetActor, { ...state.hero }, true);
  } catch {
    return false
  }

  return true;
}