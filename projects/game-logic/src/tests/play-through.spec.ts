import { areas, firstAreaTavern } from "../gameplay/data/adventure.data";
import { StateFactory } from "../framework/states/state.factory";
import { StateDispatcher } from "../framework/base/state/state-dispatcher";
import { tradeItems } from "../lib/gameplay/shared/activities/player/trade-items.activity";
import { magicPoo } from "../gameplay/data/items.data";
import { startQuest } from "../lib/gameplay/shared/activities/player/start-quest.activity";
import { IQuestOrigin } from "../framework/modules/quest/quest.interface";
import { finishQuest } from "../lib/gameplay/shared/activities/player/finish-quest.activity";
import { dataFeed } from "../gameplay/data/feed.data";
import { FIRST_AREA_TAVERN_ID } from "../gameplay/data/common-identifiers.data";


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