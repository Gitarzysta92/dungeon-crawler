import { AdventureGlobalState } from "../../gameplay/adventure/adventure-state";
import { IGameFeed } from "../../states/game.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { AdventureActivityName } from "../constants/activity-name";

export const startQuest = (payload: { questId: string }): IDispatcherDirective =>
  async (state: AdventureGlobalState, feed: IGameFeed) => {
    
    const quest = await feed.getQuest(payload.questId)
    if (!quest) {
      throw new Error("");
    }
    state.questLog.startQuest(quest);

    return [{
      name: AdventureActivityName.StartQuest,
      payload: payload,
    }]
  }