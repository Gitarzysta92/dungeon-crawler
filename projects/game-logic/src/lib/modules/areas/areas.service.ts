import { EntityService } from "../../base/entity/entity.service";
import { Guid } from "../../infrastructure/extensions/types";
import { IConnection } from "./areas.interface";
import { IArea } from "./entities/area/area.interface";
import { IResident } from "./entities/resident/resident.interface";
import { ITraveler } from "./entities/traveler/traveler.interface";

export class AreaService {

  constructor(
    private readonly _entityService: EntityService
  ) {}

  public getArea<T>(arg0: (a: IArea & T) => boolean): T & IArea {
    return this._entityService.getEntity(arg0);
  }

  public getAreas<T>(arg0: (a: IArea & T) => boolean): Array<T & IArea> {
    return this._entityService.getEntities(arg0)
  }

  public getAvailableAreas(): IArea[] {
    return this.getAreas(a => a.isUnlocked);
  }

  public getResidentsFor(a: IArea): IResident[] {
    return this._entityService.getEntities<IResident>(e => e.isResident && e.occupiedAreaId === a.id);
  }

  public getOccupierFor(a: IArea): ITraveler {
    return this._entityService.getEntity<ITraveler>(e => e.isTraveler && e.occupiedAreaId === a.id);
  }

  public getTraveler(): ITraveler {
    return this._entityService.getEntity<ITraveler>(e => e.isTraveler);
  }

  public getConnection(startAreaId: Guid, endAreaId: Guid): IConnection {
    const startArea = this.getArea(a => a.id === startAreaId);
    const endArea = this.getArea(a => a.id === endAreaId);
    const d = startArea.areaConnections.find(c => c.toArea === endArea)?.distance
    return {
      startAreaId,
      endAreaId,
      totalDistance: d,
      segments: [{ startAreaId, endAreaId, distance: d }]
    }
  }

  public calculateTravel(occupiedAreaId: Guid, areaId: Guid) {
    const areas = this._entityService.getEntities<IArea>(e => e.isArea && e.isUnlocked);
    if (areas.filter(a => a.id === occupiedAreaId || a.id === areaId).length < 2) {
      throw new Error("Given areas not exists or are not unlocked.")
    }
    const fromArea = areas.find(a => a.id === occupiedAreaId);
    return fromArea.getTravelCost(areaId);
  }

}