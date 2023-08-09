import { DungeonState } from "../../game/dungeon-state";
import { IGameFeed } from "../../game/game.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { DungeonActivityName } from "../constants/activity-name";
import { useAction } from "./use-action";

export const makeDungeonTurn = (payload: { dungeon: DungeonState }): IDispatcherDirective =>
  (state: DungeonState, feed: IGameFeed) => {
  
    state.dungeonDeck.shuffleInUtilizedTiles();
  
    const cards = state.dungeonDeck.takeCards(state.drawPerTurn);

    var activities = cards.map(c => {
      return useAction({ action: c.action as any, target: c.actionPayloadResolver })
    });

    state.dungeonDeck.addCardsToUtilized(cards);

    return [{
      name: DungeonActivityName.MakeDungeonTurn,
      payload: payload,
    }, ...activities]
  }