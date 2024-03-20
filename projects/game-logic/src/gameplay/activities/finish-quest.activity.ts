import { AdventureGameplay } from "../../adventure/adventure-gameplay";
import { IDispatcherDirective } from "../../../../../framework/base/state/state.interface";
import { AdventureActivityName } from "./activity.constants";
import { DungeonGameplay } from "../state/dungeon/dungeon-gameplay";
import { IQuest } from "../../../../../framework/modules/quest/quest.interface";

export const finishQuest = (payload: { quest: IQuest }): IDispatcherDirective =>
  async (
    state: AdventureGameplay | DungeonGameplay,
    //context: IActivityContext<IAdventureGameplayFeed | IDungeonGameplayFeed>
  ) => {
    
    state.questsService.finishQuest(payload.quest);

    return {
      name: AdventureActivityName.FinishQuest,
      payload: payload,
    }
  }