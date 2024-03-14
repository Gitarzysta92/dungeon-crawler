export class AdventureBuilder {
  public async createGame(
    name: string,
    avatar: string,
    hero: IHeroDataFeedEntity,
  ): Promise<AdventureState & IGameSettings> { 
    const adventureState = await StateFactory.createAdventureState(hero, this._dataFeedService);
    adventureState.hero.id = v4();

    return Object.assign(adventureState, {
      timestamp: new Date().getTime().toString(),
      gameVersion: await this._dataFeedService.getVersion(),
      heroName: name,
      heroAvatar: avatar,
      adventureStateId: v4()
    })
  }


  public async build(load: IAdventureGameplayPayload): Promise<IAdventureGameplayState> {
    const adventureTemplate = await this._dataFeed.getAdventureGameplayTemplate(load.adventureId);
    const startingArea = await this._dataFeed.getArea(adventureTemplate.startingAreaId);
    this._areaFactory.assignAreaObject(load.hero, startingArea);

    this._dataFeed.getActors(startingArea.assignedActorsIds);
    
    const state: IAdventureGameplayState = {
      currentDay: adventureTemplate.currentDay,
      player: load.player,
      entities: [ load.hero ],
      unlockedAreaIds: [ adventureTemplate.startingAreaId ],
      activeQuests: await this._dataFeed.getQuests(adventureTemplate.activeQuestIds),
      finishedQuestIds: [],
    };
    return state;
  }
}





// public static async createAdventureState(
//   initialData: IHeroTemplate,
//   gameFeed: IGameplayFeed
// ): Promise<AdventureGameplayState> {
//   initialData = JSON.parse(JSON.stringify(initialData));

//   const quests = await gameFeed.getQuests();
//   const items = await gameFeed.getItems();

//   const heroInventory = {
//     id: v4(),
//     actorId: initialData.id,
//     slots: initialData.inventory.itemSlots,
//     items: initialData.inventory.itemBindings.map(ib => {
//       const sourceItem = items.find(i => i.id === ib.itemId);
//       if (!sourceItem) {
//         throw new Error("Cannot find item during adventure creation")
//       }
//       return Object.assign({...sourceItem}, ib);
//     })
//   }


//   const hero = Object.assign({}, initialData);
//   delete (hero as any).itemSlots;
//   delete (hero as any).itemBindings;

//   return new AdventureGameplayState({
//     hero: Object.assign(initialData, { occupiedAreaId: initialData.occupiedAreaId, occupiedRootAreaId: initialData.occupiedRootAreaId }),
//     heroInventory: heroInventory,
//     heroProgression: initialData.heroProgression,
//     questLog: { activeQuests: [], finishedQuestIds: [] },
//     adventureMap: { unlockedAreas: await gameFeed.getAreas() },
//     dungeons: Object.fromEntries((await gameFeed.getDungeons()).map(d => {
//       return [`${d.assignedAreaId}`, Object.assign(d, {
//         dungeonLog: {}
//       })]
//     })),
//     characters: Object.fromEntries((await gameFeed.getCharacters()).map(c => {
//       return [`${c.id}:${c.assignedAreaId}`, Object.assign(c, {
//         inventory: new Inventory(c.inventory),
//         quests: quests.filter(q => q.originId)
//       })]
//     })),
//     heroSpellsAndAbilities: {
//       learnedIds: initialData.heroSpellsAndAbilities.learnedIds,
//       preparedIds: initialData.heroSpellsAndAbilities.preparedIds
//     },
//     rewardsTracker: {
//       claimedRewards: [],
//       rewardsToClaim: []
//     },
//     changesHistory: [],
//     prevState: null
//   })
// }