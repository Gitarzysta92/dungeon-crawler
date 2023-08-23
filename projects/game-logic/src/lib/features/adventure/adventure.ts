import { IPossesedItem } from "../items/inventory.interface";
import { ITravelSupply } from "./adventure.interface";

export function calculateTravelSuppliesToConsume<T extends ITravelSupply & IPossesedItem>(
  travelDistance: number,
  supplies: T[]
): { item: T, amount: number }[]  {
  const results = [];
  let aggregatedDistance = 0;
  for (let supply of supplies) {
    let numberOfConsumedItems = 0;
    while (aggregatedDistance < travelDistance && supply.amountInStack >= numberOfConsumedItems) {
      aggregatedDistance += supply.coverableDistance;
      numberOfConsumedItems++
    }
    results.push({ item: supply, amount: numberOfConsumedItems })
    if (aggregatedDistance >= travelDistance) {
      break;
    }
  }
  return results;
}