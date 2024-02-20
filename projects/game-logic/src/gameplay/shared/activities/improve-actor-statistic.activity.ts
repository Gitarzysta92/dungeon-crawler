import { AdventureGameplay } from "../../adventure/adventure-gameplay";
import { IDispatcherDirective } from "../../../../../framework/base/state/state.interface";
import { AdventureActivityName } from "./activity.constants";
import { DungeonGameplay } from "../../dungeon/state/dungeon-gameplay";
import { IImproveable } from "../../../../../framework/modules/progression/progression.interface";
import { StatisticBearer } from "../../../../../framework/modules/statistic/bearer/statistic-bearer";
import { Actor } from "../../../../../framework/modules/actor/actor";
import { IActivityContext } from "./activity.interface";
import { IAdventureGameplayFeed } from "../../adventure/adventure-gameplay.interface";
import { IDungeonGameplayFeed } from "../../dungeon/state/dungeon-gameplay.interface";
import { Statistic } from "../../../../../framework/modules/statistic/statistic";
import { IMPROVE_INTERACTION_IDENTIFIER } from "../../../../../framework/modules/progression/interactions/improve.interaction";

export const improveActorStatistic = (payload: { statistic: Statistic & IImproveable }): IDispatcherDirective =>
  async (
    state: AdventureGameplay | DungeonGameplay,
    context: IActivityContext<IAdventureGameplayFeed | IDungeonGameplayFeed>
  ) => {
  
    const actor = state.actorsService.getActor<Actor & Partial<StatisticBearer>>(context.getControlledActorId());
    if (!actor.isInGroup(context.authority.groupId)) {
      throw new Error();
    }

    if (!payload.statistic.isImproveable) {
      throw new Error();
    }

    state.interactionService.resolveInteraction(IMPROVE_INTERACTION_IDENTIFIER, payload.statistic, actor);
  
    return {
      name: AdventureActivityName.PromoteHero,
      payload: payload
    }
  }