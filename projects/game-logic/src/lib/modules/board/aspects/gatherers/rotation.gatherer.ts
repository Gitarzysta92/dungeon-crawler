import { IGatheredData, IGathererPayload } from "../../../../cross-cutting/gatherer/data-gatherer.interface";
import { GatheringHandler } from "../../../../cross-cutting/gatherer/data-gathering-handler";

import { SelectorService } from "../../../../cross-cutting/selector/selector.service";
import { IBoardObjectRotation } from "../../board.interface";

export const ROTATION_IDENTIFIER = "ROTATION_GATHERING_HANDLER"; 

export interface IRotationGatherer {
  gatherRotation: (payload: IGathererPayload<IBoardObjectRotation>) => Promise<IGatheredData<IBoardObjectRotation>>
}

export class RotationGatheringHandler extends GatheringHandler<IBoardObjectRotation> {

  dataType: string = ROTATION_IDENTIFIER;

  constructor(
    private readonly _gatherer: IRotationGatherer,
    _selectorService: SelectorService
  ) { 
    super(_selectorService);
  }

  protected gatherData(p: IGathererPayload<IBoardObjectRotation>): Promise<IGatheredData<IBoardObjectRotation>> {
    return this._gatherer.gatherRotation(p);
  }
}
