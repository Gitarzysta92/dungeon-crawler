import { AreaUnlockConditionType } from "../../features/adventure/area.constants";
import { AdventureState } from "../../game/adventure-state";
import { IGameFeed } from "../../game/game.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { SystemActivityName } from "../constants/activity-name";

export const unlockAreas = (): IDispatcherDirective =>
  (state: AdventureState, feed: IGameFeed) => {

    {
      const areas = feed.areas.filter(a => a.unlockConditions
        .some(uc => uc.conditionType === AreaUnlockConditionType.HeroLevel && uc.level === state.hero.level));
      
      for (let area of areas) {
        state.adventureMap.unlockArea(area, feed.areas);
      }
    }
    
    {
      const areas = feed.areas.filter(a => a.unlockConditions
        .some(uc => uc.conditionType === AreaUnlockConditionType.ItemPossesed &&
          state.heroInventory.hasItem(uc.itemId)));
      
      for (let area of areas) {
        state.adventureMap.unlockArea(area, feed.areas);
      }
    }


    return [{
      name: SystemActivityName.UnlockAreas,
      payload: null,
    }]
  }