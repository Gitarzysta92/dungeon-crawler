import { AdventureGameplay } from "../../adventure/adventure-gameplay";
import { IDispatcherDirective } from "../../../../../framework/base/state/state.interface";
import { AdventureActivityName } from "./activity.constants";
import { DungeonGameplayLogicState } from "../../../../gameplay/state/dungeon/dungeon-gameplay";
import { IQuest } from "../../../../../framework/modules/quest/quest.interface";

export const startQuest = (payload: { quest: IQuest }): IDispatcherDirective =>
  async (state: AdventureGameplay | DungeonGameplayLogicState) => {

    state.questsService.startQuest(payload.quest);

    return {
      name: AdventureActivityName.StartQuest,
      payload: payload,
    }
  }