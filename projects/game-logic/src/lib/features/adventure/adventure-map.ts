import { IAdventureMap } from "./adventure.interface";
import { AreaUnlockConditionType } from "./area.constants";
import { IArea, IAreaConnection } from "./area.interface";

export class AdventureMap implements IAdventureMap {

  public areas: IArea[];

  constructor(data: IAdventureMap) {
    this.areas = data.areas;
  }

  public getTravelDetails(fromAreaId: string, targetAreaId: string): IAreaConnection | undefined {
    const fromArea = this.areas.find(a => a.id === fromAreaId);
    if (!fromArea) {
      throw new Error("Adventure map: Cannot find 'fromArea' for given travel");
    }
    return fromArea.areaConnections.find(a => a.toAreaId === targetAreaId);
  }

  public unlockArea(targetArea: IArea, feed: IArea[]): void {
    let area = this.addArea(targetArea.id, feed);
    if (!area) {
      throw new Error('Adventure map: Cannot find area to unlock');
    }

    for (let area of this.areas.concat(feed)) {
      const shouldBeUnlocked = area.unlockConditions
        .some(c => c.conditionType === AreaUnlockConditionType.AnotherAreaUnlocked && c.areaId === targetArea.id);
      if (shouldBeUnlocked) {
        this.unlockArea(area, feed);
      }
    }
    area.unlocked = true;
  }

  public getArea(areaId: string): IArea | undefined {
    return this.areas.find(a => a.id === areaId);
  }

  public addArea(areaId: string, feed: IArea[]): IArea | undefined {
    let area = this.getArea(areaId);
    if (!!area) {
      return area;
    }
    area = feed.find(a => a.id === areaId);
    if (!area) {
      throw new Error("Adventure map: Cannot find given area in the feed");
    }
    this.areas.push(area);

    const nestedAreas = this._gatherNestedAreas(areaId, feed);
    for (let nestedArea of nestedAreas) {
      this.addArea(nestedArea.id, feed);
    }
    return area;
  }

  public validateAreaAccessibility(targetArea: IArea): boolean {
    targetArea = this.getArea(targetArea.id)!;
    return !!targetArea.unlocked;
  }

  public getAllAvailableAreasRelatedToArea(occupiedAreaId: string): IArea[] {
    const areas: IArea[] = [];
    const area = this.areas.find(a => a.id === occupiedAreaId);
    if (!area) {
      return areas;
    }
    areas.push(area);
    return areas.concat(this._gatherNestedAreas(area.id, this.areas));
  }

  public markAreaAsVisited(targetArea: IArea): void {

  }

  private _gatherNestedAreas(areaId: string, areas: IArea[]): IArea[] {
    return areas
      .filter(a => a.parentAreaId === areaId)
      .reduce((p, c) => p.concat(this._gatherNestedAreas(c.id, areas)), [] as IArea[]);
  }

}