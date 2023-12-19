import { AreaUnlockConditionType } from "../../features/adventure/area.constants";
import { AdventureGlobalState } from "../../gameplay/adventure/adventure-state";
import { IGameFeed } from "../../states/game.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { SystemActivityName } from "../constants/activity-name";

export const unlockAreas = (): IDispatcherDirective =>
  (state: AdventureGlobalState, feed: IGameFeed) => {

    {
      const areas = feed.getAreas.filter(a => a.unlockConditions
        .some(uc => uc.conditionType === AreaUnlockConditionType.HeroLevel && uc.level === state.hero.level));
      
      for (let area of areas) {
        state.adventureMap.unlockArea(area, feed.getAreas);
      }
    }
    
    {
      const areas = feed.getAreas.filter(a => a.unlockConditions
        .some(uc => uc.conditionType === AreaUnlockConditionType.ItemPossesed &&
          state.heroInventory.hasItem(uc.itemId)));
      
      for (let area of areas) {
        state.adventureMap.unlockArea(area, feed.getAreas);
      }
    }


    return [{
      name: SystemActivityName.UnlockAreas,
      payload: null,
    }]
  }