import { IPossesedItem } from "../item/inventory/inventory.interface";
import { ITravelState, ITravelSupply } from "./travel/travel.interface";
import { AreaUnlockConditionType } from "./area.constants";
import { IRootArea, IAreaConnection } from "./area.interface";
import { Guid } from "../../extensions/types";

export class AreaService implements ITravelState {

  public unlockedAreaIds: Guid[];
  public unlockedAreas: IRootArea[];

  constructor(data: ITravelState) {
    this.unlockedAreaIds = data.unlockedAreaIds;
  }

  public getTravelDetails(fromAreaId: string, targetAreaId: string): IAreaConnection | undefined {
    const fromArea = this.unlockedAreas.find(a => a.id === fromAreaId);
    if (!fromArea) {
      throw new Error("Adventure map: Cannot find 'fromArea' for given travel");
    }
    return fromArea.areaConnections.find(a => a.toAreaId === targetAreaId);
  }

  public unlockArea(targetArea: IRootArea, feed: IRootArea[]): void {
    let area = this.addArea(targetArea.id, feed);
    if (!area) {
      throw new Error('Adventure map: Cannot find area to unlock');
    }

    for (let area of this.unlockedAreas.concat(feed)) {
      const shouldBeUnlocked = area.unlockConditions
        .some(c => c.conditionType === AreaUnlockConditionType.AnotherAreaUnlocked && c.areaId === targetArea.id);
      if (shouldBeUnlocked) {
        this.unlockArea(area, feed);
      }
    }
    area.unlocked = true;
  }

  public getArea(areaId: string): IRootArea | undefined {
    return this.unlockedAreas.find(a => a.id === areaId);
  }

  public addArea(areaId: string, feed: IRootArea[]): IRootArea | undefined {
    let area = this.getArea(areaId);
    if (!!area) {
      return area;
    }
    area = feed.find(a => a.id === areaId);
    if (!area) {
      throw new Error("Adventure map: Cannot find given area in the feed");
    }
    this.unlockedAreas.push(area);

    const nestedAreas = this._gatherNestedAreas(areaId, feed);
    for (let nestedArea of nestedAreas) {
      this.addArea(nestedArea.id, feed);
    }
    return area;
  }

  public validateAreaAccessibility(targetArea: IRootArea): boolean {
    targetArea = this.getArea(targetArea.id)!;
    return !!targetArea.unlocked;
  }

  public getAllAvailableAreasRelatedToArea(occupiedAreaId: string): IRootArea[] {
    const areas: IRootArea[] = [];
    const area = this.unlockedAreas.find(a => a.id === occupiedAreaId);
    if (!area) {
      return areas;
    }
    areas.push(area);
    return areas.concat(this._gatherNestedAreas(area.id, this.unlockedAreas));
  }

  public markAreaAsVisited(targetArea: IRootArea): void {

  }

  public calculateTravelSuppliesToConsume<T extends ITravelSupply & IPossesedItem>(
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

  private _gatherNestedAreas(areaId: string, areas: IRootArea[]): IRootArea[] {
    return areas
      .filter(a => a.parentAreaId === areaId)
      .reduce((p, c) => [c, ...p].concat(this._gatherNestedAreas(c.id, areas)), [] as IRootArea[]);
  }

}