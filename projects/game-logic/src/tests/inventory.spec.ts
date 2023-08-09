import { areas, characters, questLog, vendorCharacter, vendorMagicPoo } from "../data/adventure";
import { firstAreaTavernId } from "../data/common-identifiers";
import { hero, heroAxe, heroInventory, heroPotion, heroSword } from "../data/commons";
import { feed } from "../data/feed";
import { magicPoo } from "../data/items";
import { buyItem } from "../lib/activities/directives/buy-item";
import { equipItem } from "../lib/activities/directives/equip-item";
import { sellItem } from "../lib/activities/directives/sell-item";
import { unequipItem } from "../lib/activities/directives/unequip-item";
import { InventorySlotType } from "../lib/features/items/inventory.constants";
import { AdventureState } from "../lib/game/adventure-state";
import { StateFactory } from "../lib/game/state-factory";
import { StateDispatcher } from "../lib/utils/state-dispatcher/state-dispatcher";

describe('Inventory and equipment', () => {

  const stateDispatcher= new StateDispatcher(feed);
  const stateFactory = new StateFactory();
  
  let adventureState: AdventureState;

  beforeEach(() => {
    adventureState = stateFactory.createAdventureState({
      hero: Object.assign(hero, { occupiedAreaId: firstAreaTavernId }),
      heroInventory: heroInventory,
      adventureMap: { areas },
      characters: characters,
      questLog: questLog,
      dungeonLog: {}
    });
  });

  it('should be able to purchase all items from vendor', () => {
    // Arrange 
    const vendor = adventureState.getCharacterFromOccupiedArea(vendorCharacter)!;
    const itemToPurchase = vendor!.inventory.getItem(vendorMagicPoo)!;
    itemToPurchase.amountInStack = 2;

    let heroInitialGoldAmount = adventureState.heroInventory.getCurrency(itemToPurchase.purchaseCurrency)!.amountInStack;
    const vendorInitialItemAmount = vendor.inventory.getItem(itemToPurchase)!.amountInStack;

    // Act
    adventureState = stateDispatcher.next(buyItem({ item: itemToPurchase, amount: 1, fromCharacter: vendor }), adventureState);

    // Assert
    expect(adventureState.heroInventory.getItem(itemToPurchase)).toBeTruthy();
    expect(adventureState.heroInventory.getCurrency(itemToPurchase.purchaseCurrency)!.amountInStack).toEqual(heroInitialGoldAmount -= itemToPurchase.sellBasePrice);
    expect(vendor.inventory.getItem(itemToPurchase)?.amountInStack).toBeLessThan(vendorInitialItemAmount);
    expect(adventureState.heroInventory.getItem(itemToPurchase)?.amountInStack).toEqual(1);

    // Act
    adventureState = stateDispatcher.next(buyItem({ item: itemToPurchase, amount: 1, fromCharacter: vendor }), adventureState);

    // Assert
    expect(adventureState.heroInventory.getItem(itemToPurchase)).toBeTruthy();
    expect(adventureState.heroInventory.getCurrency(itemToPurchase.purchaseCurrency)!.amountInStack).toEqual(heroInitialGoldAmount -= itemToPurchase.sellBasePrice);
    expect(vendor.inventory.getItem(itemToPurchase)).toBeFalsy();
    expect(adventureState.heroInventory.getItem(itemToPurchase)?.amountInStack).toEqual(2);
  });


  it('should be able to sell all items to vendor', () => {
    // Arrange    
    const vendor = adventureState.getCharacterFromOccupiedArea(vendorCharacter)!;

    const itemToSell = adventureState.heroInventory.getItem(heroPotion)!;
    itemToSell.amountInStack = 2;

    let heroInitialGoldAmount = adventureState.heroInventory.getCurrency(itemToSell.purchaseCurrency)!.amountInStack;
    let heroInitialItemAmount = itemToSell.amountInStack;
    const vendorInitialItemAmount = vendor.inventory.getItem(itemToSell)!.amountInStack;
    const amountToSell = 1;

    // Act
    adventureState = stateDispatcher.next(sellItem({ item: itemToSell, amount: amountToSell, toCharacter: vendor }), adventureState);

    // Assert
    expect(adventureState.heroInventory.getItem(itemToSell)).toBeTruthy();
    expect(adventureState.heroInventory.getCurrency(itemToSell.purchaseCurrency)!.amountInStack).toEqual(heroInitialGoldAmount += itemToSell.sellBasePrice);
    expect(vendor.inventory.getItem(itemToSell)?.amountInStack).toBeGreaterThan(vendorInitialItemAmount);
    expect(adventureState.heroInventory.getItem(itemToSell)?.amountInStack).toEqual(heroInitialItemAmount -= amountToSell);

    // Act
    adventureState = stateDispatcher.next(sellItem({ item: itemToSell, amount: amountToSell, toCharacter: vendor }), adventureState);

    // Assert
    expect(vendor.inventory.getItem(itemToSell)).toBeTruthy();
    expect(adventureState.heroInventory.getCurrency(itemToSell.purchaseCurrency)!.amountInStack).toEqual(heroInitialGoldAmount += itemToSell.sellBasePrice);
    expect(adventureState.heroInventory.getItem(itemToSell)).toBeFalsy();
  });

  it('should not be able to sell not possesed item', () => {
    // Arrange
    const vendor = adventureState.getCharacterFromOccupiedArea(vendorCharacter)!;
    const itemToSell = adventureState.heroInventory.getItem(magicPoo)!;
    const amountToSell = 1;
    const heroInitialItemsAmount = adventureState.heroInventory.items.reduce((acc, curr) => acc += curr.amountInStack ,0);

    // Act
    const act = () => adventureState = stateDispatcher.next(sellItem({ item: itemToSell, amount: amountToSell, toCharacter: vendor }), adventureState);

    // Assert
    expect(act).toThrowError();
    expect(adventureState.heroInventory.items.reduce((acc, curr) => acc += curr.amountInStack, 0)).toEqual(heroInitialItemsAmount);
  });

  it('should not be able to purchase item for inventory without empty slot', () => {
    // Arrange
    const vendor = adventureState.getCharacterFromOccupiedArea(vendorCharacter)!;
    adventureState.heroInventory.slots = adventureState.heroInventory.slots.filter(s => s.isOccupied);
    const itemToPurchase = vendor!.inventory.getItem(vendorMagicPoo)!;
    const vendorInitialItemsAmount = vendor.inventory.items.reduce((acc, curr) => acc += curr.amountInStack ,0);

    // Act
    const act = () => adventureState = stateDispatcher.next(buyItem({ item: itemToPurchase, amount: 1, fromCharacter: vendor }), adventureState);

    // Assert
    expect(act).toThrowError();
    expect(vendor.inventory.items.reduce((acc, curr) => acc += curr.amountInStack, 0)).toEqual(vendorInitialItemsAmount);
  });

  it('should unequip sword and add it to the inventory', () => {
    // Arrange
    const heroSwordForTest = Object.assign({}, heroSword);
    const itemInitialSlot = adventureState.heroInventory.slots.find(s => s.id === heroSwordForTest.slotIds);

    // Act
    adventureState = stateDispatcher.next(unequipItem({ item: heroSwordForTest }), adventureState);

    // Assert
    expect(itemInitialSlot?.isOccupied).toBeFalsy();
    const item = adventureState.heroInventory.getItem(heroSwordForTest)!;
    expect(item.slotIds).toBeTruthy();
    expect(item.isEquipped).toBeFalsy();
    expect(item.getAssociatedSlots().isOccupied).toBeTruthy();
    expect(item.slotIds).not.toEqual(itemInitialSlot?.id)
  });

  it('should swap sword and axe in the equipment slot', () => {
    // Arrange
    const heroAxeForTest = Object.assign({}, heroAxe);
    const swordInitialSlot = adventureState.heroInventory.slots.find(s => s.id === heroSword.slotIds);
    const axeInitialSlot = adventureState.heroInventory.slots.find(s => s.id === heroAxeForTest.slotIds);

    // Act
    adventureState = stateDispatcher.next(equipItem({ item: heroAxeForTest, slots: swordInitialSlot }), adventureState);

    // Assert
    expect(swordInitialSlot?.isOccupied).toBeTruthy();
    const sword = adventureState.heroInventory.getItem(heroSword)!;
    expect(sword.slotIds).toBeTruthy();
    expect(sword.slotIds).not.toEqual(swordInitialSlot?.id);
    const axe = adventureState.heroInventory.getItem(heroAxeForTest);
    expect(axe?.slotIds).toBeTruthy();
    expect(axe?.slotIds).not.toEqual(axeInitialSlot?.id);
  });

  it('should equip axe to second weapon slot and remove it from the inventory', () => {
    // Arrange
    const itemInitialSlot = adventureState.heroInventory.slots.find(s => s.slotType === InventorySlotType.Weapon)

    // Act
    adventureState = stateDispatcher.next(equipItem({ item: heroSword }), adventureState);

    // Assert
    expect(itemInitialSlot?.isOccupied).toBeFalsy();
    const item = adventureState.heroInventory.getItem(heroSword);
    expect(item.slotIds).toBeTruthy();
    expect(item.slotIds).not.toEqual(itemInitialSlot?.id)
  });

});