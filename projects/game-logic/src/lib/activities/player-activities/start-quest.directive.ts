import { AdventureState } from "../../game/adventure-state";
import { IGameFeed } from "../../game/game.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { AdventureActivityName } from "../constants/activity-name";

export const startQuest = (payload: { questId: string }): IDispatcherDirective =>
  (state: AdventureState, feed: IGameFeed) => {
    
    const quest = feed.quests.find(q => q.id === payload.questId);
    if (!quest) {
      throw new Error("");
    }
    state.questLog.startQuest(quest);

    return [{
      name: AdventureActivityName.StartQuest,
      payload: payload,
    }]
  }