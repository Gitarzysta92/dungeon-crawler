import { ActorType } from "../../features/actors/actors.constants";
import { IActor } from "../../features/actors/actors.interface";
import { IBoardCoordinates, IAassignedBoardObject } from "../../features/board/board.interface";
import { resolveCostAndInteraction } from "../../features/interactions/interactions";
import { IReusable } from "../../features/interactions/interactions.interface";
import { DungeonGameplayState } from "../../gameplay/dungeon/dungeon-global-state";
import { IGameFeed } from "../../states/game.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { DungeonActivityName } from "../constants/activity-name";

export const makeActorInteraction = (payload: { actorId: string }): IDispatcherDirective =>
  async (state: DungeonGameplayState, feed: IGameFeed) => {
    

    return [{
      name: DungeonActivityName.MakeActorInteraction,
      payload: payload,
    }]
  }