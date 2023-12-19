import { getStatsDifferences } from "../../features/actors/actors";
import { IBasicStats, ISecondaryStats } from "../../features/statistics/statistics.interface";
import { AdventureGlobalState } from "../../gameplay/adventure/adventure-state";
import { IGameplayFeed } from "../../gameplay/gameplay-feed.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { AdventureActivityName } from "../constants/activity-name";

export const promoteHero = (payload: { basicStats: IBasicStats, secondaryStats: ISecondaryStats }): IDispatcherDirective =>
  async (state: AdventureGlobalState, feed: IGameplayFeed) => {
  
    if (!state.heroProgression.isAvailablePromotion()) {
      throw new Error("There is no available promotion")
    }

    const basicDifferences = getStatsDifferences(payload.basicStats, state.hero);
    const secondaryDifferences = getStatsDifferences(payload.secondaryStats, state.hero);

    if (basicDifferences.concat(secondaryDifferences).some(d => d.value < 0)) {
      throw new Error("Stat changes cannot decrease actual value");
    }

    state.heroProgression.applyPromotion(state.hero, [
      ...basicDifferences.map(s => ({ promotionDesignateType: PromotionDesignateType.IncreaseBasicStats, statName: s.statName, value: s.value })),
      ...secondaryDifferences.map(s => ({ promotionDesignateType: PromotionDesignateType.IncreaseSecondaryStats, statName: s.statName, value: s.value })),
    ]);
  
    return [{
      name: AdventureActivityName.PromoteHero,
      payload: payload
    }]
  }