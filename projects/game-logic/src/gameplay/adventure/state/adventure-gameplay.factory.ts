import { ActorsService } from "../../../framework/modules/actor/actor.service";
import { AreaFactory } from "../../../framework/modules/area/area.factory";
import { AreaService } from "../../../framework/modules/area/area.service";
import { ContinuousGameplayService } from "../../../framework/modules/playstyle/continuous/continuous-gameplay.service";
import { QuestService } from "../../../framework/modules/quest/quest.service";
import { AdventureGameplay } from "./adventure-gameplay";
import { IAdventureGameplayFeed, IAdventureGameplayPayload, IAdventureGameplayState } from "./adventure-gameplay.interface";

export class AdventureGameplayFactory {

  constructor(
    private readonly _dataFeed: IAdventureGameplayFeed,
    private readonly _areaFactory: AreaFactory
  ) {}

  public async create(load: IAdventureGameplayPayload): Promise<AdventureGameplay> {
    const state = await this.build(load);
    return this.initialize(state);
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

  public initialize(state: IAdventureGameplayState): AdventureGameplay {

    const ciGameplayService = new ContinuousGameplayService(state);
    const actorsService = new ActorsService(state);
    const questsService = new QuestService(state);
    const areaService = new AreaService(state);
    
    const initializedState = new AdventureGameplay(
      ciGameplayService,
      actorsService,
      questsService,
      areaService
    );

    return initializedState;
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