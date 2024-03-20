import { Guid } from "../../extensions/types";
import { ITraveler } from "./entities/occupier/occupier.interface";
import { IResident } from "./entities/resident/resident.interface";
import { IAreaDeclaration, IArea } from "./entities/area/area.interface";
import { EntityService } from "../../base/entity/entity.service";

export class AreaService {
  
  public unlockedAreaIds: Guid[];
  public unlockedAreas: IAreaDeclaration[];

  constructor(
    private readonly _entityService: EntityService
  ) {}

  public getResidentsFor(a: IArea): IResident[] {
    return this._entityService.getEntities<IResident>(e => e.isResident && e.occupiedAreaId === a.id);
  }

  public getOccupierFor(a: IArea): ITraveler {
    return this._entityService.getEntity<ITraveler>(e => e.isTraveler && e.occupiedAreaId === a.id);
  }

  public getTraveler(): ITraveler {
    return this._entityService.getEntity<ITraveler>(e => e.isTraveler);
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