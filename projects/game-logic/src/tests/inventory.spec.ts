import { vendorCharacter, vendorMagicPoo } from "../gameplay/data/adventure.data";
import { heroAxe, heroPotion, heroStaff, heroSword, weaponSecondSlot } from "../gameplay/data/hero.data";
import { magicPoo } from "../gameplay/data/items.data";
import { tradeItems } from "../lib/gameplay/shared/activities/player/trade-items.activity";
import { equipItem } from "../lib/gameplay/shared/activities/player/equip-item.activity";
import { moveInventoryItem } from "../lib/gameplay/shared/activities/player/move-inventory-item.activity";
import { sellItem } from "../lib/gameplay/shared/activities/player/sell-item.directive";
import { unequipItem } from "../lib/gameplay/shared/activities/player/unequip-item.activity";
import { InventorySlotType } from "../framework/modules/item/inventory/inventory.constants";
import { AdventureGameplay } from "../lib/gameplay/adventure/adventure-gameplay";
import { createAdventureState, createStateDispatcher } from "./test-helpers";

describe('Inventory and equipment', () => {

  const stateDispatcher= createStateDispatcher()
  
  let adventureState: AdventureGameplay;

  beforeEach(() => {
    adventureState = createAdventureState()
  });

  it('should be able to purchase item from vendor', () => {
    // Arrange 
    const vendor = adventureState.getCharacterFromOccupiedArea(vendorCharacter)!;
    const itemToPurchase = vendor!.inventory.getItem(vendorMagicPoo)!;
    itemToPurchase.amountInStack = 2;

    let heroInitialGoldAmount = adventureState.heroInventory.getCurrency(itemToPurchase.purchaseCurrency)!.amountInStack;
    const vendorInitialItemAmount = vendor.inventory.getItem(itemToPurchase)!.amountInStack;

    // Act
    adventureState = stateDispatcher.next(tradeItems({ item: itemToPurchase, amount: 1, vendor: vendor }), adventureState);

    // Assert
    expect(adventureState.heroInventory.getItem(itemToPurchase)).toBeTruthy();
    expect(adventureState.heroInventory.getCurrency(itemToPurchase.purchaseCurrency)!.amountInStack).toEqual(heroInitialGoldAmount -= itemToPurchase.sellBasePrice);
    expect(vendor.inventory.getItem(itemToPurchase)?.amountInStack).toBeLessThan(vendorInitialItemAmount);
    expect(adventureState.heroInventory.getItem(itemToPurchase)?.amountInStack).toEqual(1);

    // Act
    adventureState = stateDispatcher.next(tradeItems({ item: itemToPurchase, amount: 1, vendor: vendor }), adventureState);

    // Assert
    expect(adventureState.heroInventory.getItem(itemToPurchase)).toBeTruthy();
    expect(adventureState.heroInventory.getCurrency(itemToPurchase.purchaseCurrency)!.amountInStack).toEqual(heroInitialGoldAmount -= itemToPurchase.sellBasePrice);
    expect(vendor.inventory.getItem(itemToPurchase)).toBeFalsy();
    expect(adventureState.heroInventory.getItem(itemToPurchase)?.amountInStack).toEqual(2);
  });


  it('should be able to sell item to vendor', () => {
    // Arrange    
    const vendor = adventureState.getCharacterFromOccupiedArea(vendorCharacter)!;

    const itemToSell = adventureState.heroInventory.getItem(heroPotion)!;
    itemToSell.amountInStack = 2;

    let heroInitialGoldAmount = adventureState.heroInventory.getCurrency(itemToSell.purchaseCurrency)!.amountInStack;
    let heroInitialItemAmount = itemToSell.amountInStack;
    const vendorInitialItemAmount = vendor.inventory.getItem(itemToSell)!.amountInStack;
    const amountToSell = 1;

    // Act
    adventureState = stateDispatcher.next(sellItem({ item: itemToSell, amount: amountToSell, vendor: vendor }), adventureState);

    // Assert
    expect(adventureState.heroInventory.getItem(itemToSell)).toBeTruthy();
    expect(adventureState.heroInventory.getCurrency(itemToSell.purchaseCurrency)!.amountInStack).toEqual(heroInitialGoldAmount += itemToSell.sellBasePrice);
    expect(vendor.inventory.getItem(itemToSell)?.amountInStack).toBeGreaterThan(vendorInitialItemAmount);
    expect(adventureState.heroInventory.getItem(itemToSell)?.amountInStack).toEqual(heroInitialItemAmount -= amountToSell);

    // Act
    adventureState = stateDispatcher.next(sellItem({ item: itemToSell, amount: amountToSell, vendor: vendor }), adventureState);

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
    const act = () => adventureState = stateDispatcher.next(sellItem({ item: itemToSell, amount: amountToSell, vendor: vendor }), adventureState);

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
    const act = () => adventureState = stateDispatcher.next(tradeItems({ item: itemToPurchase, amount: 1, vendor: vendor }), adventureState);

    // Assert
    expect(act).toThrowError();
    expect(vendor.inventory.items.reduce((acc, curr) => acc += curr.amountInStack, 0)).toEqual(vendorInitialItemsAmount);
  });

  it('should unequip sword and add it to the inventory', () => {
    // Arrange
    const swordInitialSlots = adventureState.heroInventory.getAllAssociatedSlots(heroSword);

    // Act
    adventureState = stateDispatcher.next(unequipItem({ item: Object.assign({}, heroSword) }), adventureState);
    
    // Assert
    expect(swordInitialSlots.every(s => !s.isOccupied)).toBeTruthy();
    expect(adventureState.heroInventory.getAllAssociatedItems(swordInitialSlots).length).toEqual(0);
    const swordForTest = adventureState.heroInventory.getItem(heroSword)!;
    expect(swordForTest.getAssociatedSlots().every(s => s.isOccupied)).toBeTruthy();
    expect(swordInitialSlots).not.toStrictEqual(swordForTest.getAssociatedSlots())
    expect(swordForTest.isEquipped).toBeFalsy();
  });

  it('should swap sword and axe in the equipment slot', () => {
    // Arrange
    const swordInitialSlots = adventureState.heroInventory.getAllAssociatedSlots(heroSword);
    const axeInitialSlots = adventureState.heroInventory.getAllAssociatedSlots(heroAxe);

    // Act
    adventureState = stateDispatcher.next(equipItem({ item: Object.assign({}, heroAxe), slots: swordInitialSlots }), adventureState);

    // Assert
    const swordForTest = adventureState.heroInventory.getItem(heroSword)!;
    expect(swordForTest.isEquipped).toBeFalsy();
    expect(swordInitialSlots).not.toStrictEqual(adventureState.heroInventory.getAllAssociatedSlots(swordForTest));

    const axeForTest = adventureState.heroInventory.getItem(heroAxe)!;
    expect(axeForTest.isEquipped).toBeTruthy();
    expect(axeInitialSlots).not.toStrictEqual(adventureState.heroInventory.getAllAssociatedSlots(axeForTest));
    expect(axeInitialSlots.every(s => s.isOccupied)).toBeTruthy();
    expect(swordInitialSlots).toStrictEqual(adventureState.heroInventory.getAllAssociatedSlots(axeForTest));
  });

  it('should equip axe to second weapon slot and remove it from the inventory', () => {
    // Arrange
    const slot = adventureState.heroInventory.slots.find(s => s.id === weaponSecondSlot.id)!;
    const swordInitialSlots = adventureState.heroInventory.getAllAssociatedSlots(heroSword);

    // Act
    adventureState = stateDispatcher.next(equipItem({ item: Object.assign({}, heroSword), slots: [slot] }), adventureState);

    // Assert
    const swordForTest = adventureState.heroInventory.getItem(heroSword)!;
    expect(swordForTest.isEquipped).toBeTruthy();
    expect(swordInitialSlots.every(s => !s.isOccupied)).toBeTruthy();
    expect(adventureState.heroInventory.getAllAssociatedSlots(swordForTest)).toContain(slot);
    expect(adventureState.heroInventory.getAllAssociatedSlots(swordForTest).every(s => s.isOccupied)).toBeTruthy();
  });

  it('should equip staff to both weapon slots, remove it from the inventory and move previous items back to the inventory', () => {
    // Arrange
    const swordInitialSlots = adventureState.heroInventory.getAllAssociatedSlots(heroSword);
    const axeForTest = adventureState.heroInventory.getItem(heroAxe)!;
    axeForTest.slotIds = [];
    axeForTest.slotIds.push(weaponSecondSlot.id);
    axeForTest.isEquipped = true;
    const axeSlot = adventureState.heroInventory.slots.find(s => s.id === weaponSecondSlot.id)!;
    axeSlot.isOccupied = true;
    const axeInitialSlots = adventureState.heroInventory.getAllAssociatedSlots(axeForTest);

    // Act
    adventureState = stateDispatcher.next(equipItem({ item: Object.assign({}, heroStaff) }), adventureState);

    // Assert
    const swordForTest = adventureState.heroInventory.getItem(heroSword)!;
    expect(swordForTest.isEquipped).toBeFalsy();
    expect(adventureState.heroInventory.getAllAssociatedSlots(swordForTest)).not.toStrictEqual(swordInitialSlots);
    expect(adventureState.heroInventory.getAllAssociatedSlots(swordForTest).length).toEqual(1);
    expect(axeForTest.isEquipped).toBeFalsy();
    expect(adventureState.heroInventory.getAllAssociatedSlots(axeForTest)).not.toStrictEqual(axeInitialSlots);
    expect(adventureState.heroInventory.getAllAssociatedSlots(axeForTest).length).toEqual(1);
    const staffForTest = adventureState.heroInventory.getItem(heroStaff);
    expect(staffForTest?.getAssociatedSlots().length).toEqual(2);
    expect(staffForTest?.isEquipped).toBeTruthy();
  });

  it('should not equip staff to both weapon slots when inventory has not empty slots', () => {
    // Arrange
    const axeForTest = adventureState.heroInventory.getItem(heroAxe)!;
    axeForTest.slotIds = [];
    axeForTest.slotIds.push(weaponSecondSlot.id);
    axeForTest.isEquipped = true;
    const axeSlot = adventureState.heroInventory.slots.find(s => s.id === weaponSecondSlot.id)!;
    axeSlot.isOccupied = true;

    adventureState.heroInventory.slots.filter(s => !s.isOccupied && s.slotType === InventorySlotType.Common)
      .forEach(s => {
        adventureState.heroInventory.addItem(Object.assign({ ...heroPotion }, { slotIds: [s.id] }), 1);
        s.isOccupied = true;
      })

    //Act
    const act = () => stateDispatcher.next(equipItem({ item: Object.assign({}, heroStaff) }), adventureState);

    //Assert
    expect(act).toThrowError();
  });

  it('should move item to given slot if it is empty', () => {
    // Arrange
    const potionForTest = adventureState.heroInventory.getItem(heroPotion)!;
    const potionInitialSlots = adventureState.heroInventory.getAllAssociatedSlots(potionForTest);
    const destinationSlot = adventureState.heroInventory.getFirstEmptyCommonSlot()!;

    //Act
    adventureState = stateDispatcher.next(moveInventoryItem({
      item: Object.assign({}, heroPotion),
      amount: heroPotion.amountInStack,
      slot: destinationSlot
    }), adventureState);

    //Assert
    const potionSlots = adventureState.heroInventory.getAllAssociatedSlots(potionForTest);
    expect(potionSlots).not.toStrictEqual(potionInitialSlots);
  });

  it('should not move item to given slot if this slot is already occupied', () => {
    // Arrange
    const destinationSlot = adventureState.heroInventory.getFirstEmptyCommonSlot()!;

    adventureState.heroInventory.slots.filter(s => !s.isOccupied && s.slotType === InventorySlotType.Common)
      .forEach(s => {
        adventureState.heroInventory.addItem(Object.assign({ ...heroPotion }, { slotIds: [s.id] }), 1);
        s.isOccupied = true;
      })

    //Act
    const act = () => stateDispatcher.next(moveInventoryItem({
      item: Object.assign({}, heroPotion),
      amount: heroPotion.amountInStack,
      slot: destinationSlot
    }), adventureState);

    //Assert
    expect(act).toThrowError();
  });

});