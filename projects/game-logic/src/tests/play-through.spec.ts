import { areas, firstAreaTavern } from "../data/adventure.data";
import { StateFactory } from "../lib/game/state.factory";
import { StateDispatcher } from "../lib/utils/state-dispatcher/state-dispatcher";
import { buyItem } from "../lib/activities/player-activities/buy-item.directive";
import { magicPoo } from "../data/items.data";
import { startQuest } from "../lib/activities/player-activities/start-quest.directive";
import { IQuestStarter } from "../lib/features/quests/quests.interface";
import { finishQuest } from "../lib/activities/player-activities/finish-quest.directive";
import { dataFeed } from "../data/feed.data";
import { firstAreaTavernId } from "../data/common-identifiers.data";


describe('Playthrough', () => {

  // const stateDispatcher= new StateDispatcher(dataFeed);
  // const stateFactory = new StateFactory();

  // beforeEach(() => {
  //   initialState = stateGenerator.createInitialState(gameConfiguration);
  // });

  it('should go through whole game and pick a winner', () => {
    //let adventureState = stateFactory.createAdventureState(firstAreaTavernId);

    // Buy quest item
    // const charactersInArea = adventureState.getAllCharactersFromOccupiedArea();
    // expect(charactersInArea.length).toEqual(1);

    // const vendor = charactersInArea[0];
    // expect(vendor.assignedAreaId).toEqual(firstAreaTavern.id);

    // const itemToPurchase = vendor.inventory.getItem(magicPoo)!;
    // expect(itemToPurchase).toBeTruthy();

    // const heroInitialGoldAmount = adventureState.heroInventory.getCurrency(itemToPurchase.purchaseCurrency)!.amountInStack;
    // const vendorInitialItemAmount = vendor.inventory.getItem(itemToPurchase)!.amountInStack;
    // adventureState = stateDispatcher.next(buyItem({ item: itemToPurchase, amount: 1, fromCharacter: vendor }), adventureState);
    // expect(adventureState.heroInventory.getItem(itemToPurchase)).toBeTruthy();
    // expect(adventureState.heroInventory.getCurrency(itemToPurchase.purchaseCurrency)!.amountInStack).toEqual(heroInitialGoldAmount - itemToPurchase.sellBasePrice);
    // expect(vendor.inventory.getItem(itemToPurchase)?.amountInStack).toBeLessThan(vendorInitialItemAmount);

    // // Start quest from quest item
    // const startingQuestItem = vendor.inventory.getItem(itemToPurchase) as IQuestStarter;
    // expect(startingQuestItem.startQuestId).toBeTruthy();

    // adventureState = stateDispatcher.next(startQuest({ questId: startingQuestItem.startQuestId }), adventureState);
    // expect(adventureState.questLog.activeQuests.some(q => q.id === startingQuestItem.startQuestId)).toBeTruthy();

    // // Finish started quest
    // stateDispatcher.next(finishQuest({ questId: startingQuestItem.startQuestId }), adventureState);
    // expect(adventureState.questLog.finishedQuestIds.some(id => id === startingQuestItem.startQuestId));


  });
});