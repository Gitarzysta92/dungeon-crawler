import { AdventureGameplay } from "../../adventure/adventure-gameplay";
import { IDispatcherDirective } from "../../../../../framework/base/state/state.interface";
import { AdventureActivityName } from "./activity.constants";
import { DungeonGameplay } from "../state/dungeon/dungeon-gameplay";
import { IQuest } from "../../../../../framework/modules/quest/quest.interface";

export const startQuest = (payload: { quest: IQuest }): IDispatcherDirective =>
  async (state: AdventureGameplay | DungeonGameplay) => {

    state.questsService.startQuest(payload.quest);

    return {
      name: AdventureActivityName.StartQuest,
      payload: payload,
    }
  }