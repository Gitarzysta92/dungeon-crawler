import { IAdventureMap } from "./adventure.interface";
import { IArea } from "./area.interface";

export class AdventureMap implements IAdventureMap {


  public areas: IArea[];

  constructor(data: IAdventureMap) {
    this.areas = data.areas;
  }

  public travelTo(targetArea: IArea): void {
    
  }

  public validateAreaAccessibility(targetArea: IArea): boolean {
    return false;
  }

  public getAllAvailableAreas(occupiedAreaId: string): IArea[] {
    const areas: IArea[] = [];
    const area = this.areas.find(a => a.id === occupiedAreaId);
    if (!area) {
      return areas;
    }
    areas.push(area);
    return areas.concat(this._gatherNestedAreas(area.id));
  }

  private _gatherNestedAreas(areaId: string): IArea[] {
    return this.areas
      .filter(a => a.parentAreaId === areaId)
      .reduce((p, c) => p.concat(this._gatherNestedAreas(c.id)), [] as IArea[]);
  }

}