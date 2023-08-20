import { resolveCostAndInteraction } from "../../features/interactions/interactions";
import { IActor } from "../../features/actors/actors.interface";
import { ActorType } from "../../features/actors/actors.constants";
import { AdventureState } from "../../game/adventure-state";
import { DungeonState } from "../../game/dungeon-state";
import { GameLayer } from "../../game/game.constants";
import { IGameFeed } from "../../game/game.interface";
import { IReusable } from "../../features/interactions/interactions.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { AdventureActivityName } from "../constants/activity-name";

export const makeInteraction = (payload: { actor: IActor & IReusable }): IDispatcherDirective =>
  (state: AdventureState | DungeonState, feed: IGameFeed) => {

    if (state.gameLayer === GameLayer.Dungeon) {
      const reducedStats = resolveCostAndInteraction(payload.actor , state.hero);
      if (!reducedStats) {
        throw new Error("Hero has not sufficient amount of resources");
      }  
    }

    if (payload.actor.actorType === ActorType.Treasure) {

    }

    if (payload.actor.actorType === ActorType.Obstacle) {

    }

    if (payload.actor.actorType === ActorType.Character) {

    }

    return [{
      name: AdventureActivityName.SellItem,
      payload: payload,
    }]
  }