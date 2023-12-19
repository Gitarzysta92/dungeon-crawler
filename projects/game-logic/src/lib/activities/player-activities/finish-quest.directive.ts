import { AdventureGlobalState } from "../../gameplay/adventure/adventure-state";
import { IGameFeed } from "../../states/game.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { AdventureActivityName } from "../constants/activity-name";

export const finishQuest = (payload: { questId: string }): IDispatcherDirective =>
  async (state: AdventureGlobalState, feed: IGameFeed) => {
    
    const quest = feed.getQuests.find(q => q.id === payload.questId);
    if (!quest) {
      throw new Error("");
    }
    state.questLog.finishQuest(quest);

    return [{
      name: AdventureActivityName.FinishQuest,
      payload: payload,
    }]
  }