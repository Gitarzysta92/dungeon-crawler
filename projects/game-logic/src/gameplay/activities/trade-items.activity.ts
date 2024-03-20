import { AdventureActivityName } from "./activity.constants";
import { AdventureGameplay } from "../../adventure/adventure-gameplay";
import { IDispatcherDirective } from "../../../../../framework/base/state/state.interface";
import { Item } from "../../../../../framework/modules/item/item";
import { DungeonGameplay } from "../state/dungeon/dungeon-gameplay";
import { Actor } from "../../../../../framework/modules/actor/actor";
import { Tradable } from "../../../../../framework/modules/trade/tradable";
import { Hero } from "../../../hero";
import { AreaObject } from "../../../../../framework/modules/area/area-object/area-object";
import { InventoryBearer } from "../../../../../framework/modules/item/inventory/inventory-bearer";
import { TRADE_INTERACTION_IDENTIFIER } from "../../../../../framework/modules/trade/interactions/trade.interaction";


export const tradeItems = (payload: {
  heroItems: { item: Item & Tradable, amount: number},
  vendorItems: { item: Item & Tradable, amount: number},
  vendor: Actor & AreaObject & InventoryBearer
}): IDispatcherDirective =>
  async (state: AdventureGameplay | DungeonGameplay, context: any) => {

    const hero = state.actorsService.getActor<Hero>(context.selectedHeroId);
    if (!hero.isInGroup(context.authority.groupId)) {
      throw new Error();
    }

    if (!hero.shareAreaWith(payload.vendor)) {
      throw new Error("Hero is not in the same area as given character");
    }

    if (!payload.item.isTradable) {
      throw new Error();
    }

    if (!payload.vendor.isInventoryBearer) {
      throw new Error();
    }

    if (!payload.vendor.possessItem(payload.item, payload.amount)) {
      throw new Error("Vendor has not possessing given item");
    }

    state.interactionService.resolveInteraction(TRADE_INTERACTION_IDENTIFIER, payload.item, hero);

    const transaction = state.tradingService.makeTransaction(item, amount, vendor);

    hero.reduceCurrencyAmount(transactionCost, payload.item.purchaseCurrency);
    hero.addItem(Object.assign({}, payload.item), payload.amount);
    payload.vendor.removeItem(payload.item, payload.amount);

    return [{
      name: AdventureActivityName.BuyItem,
      payload: payload,
    }]
  }