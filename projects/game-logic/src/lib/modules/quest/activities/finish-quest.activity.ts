

export const finishQuest = (payload: { quest: IQuest }): IDispatcherDirective =>
  async (
    state: AdventureGameplay | DungeonGameplayLogicState,
    //context: IActivityContext<IAdventureGameplayFeed | IDungeonGameplayFeed>
  ) => {
    
    state.questsService.finishQuest(payload.quest);

    return {
      name: AdventureActivityName.FinishQuest,
      payload: payload,
    }
  }