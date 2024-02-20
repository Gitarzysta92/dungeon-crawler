import { IGatheredData } from "../../../../cross-cutting/gatherer/data-gatherer.interface";
import { IGathererPayload, GatheringHandlerBase } from "../../../../cross-cutting/gatherer/data-gathering-handler";
import { SelectorService } from "../../../../cross-cutting/selector/selector.service";
import { IPath } from "../../pathfinding/pathfinding.interface";

export const PATH_IDENTIFIER = "FIELD_GATHERING_HANDLER_IDENTIFIER"; 

export interface IPathGatherer {
  gatherPath: (payload: IGathererPayload<IPath>) => Promise<IGatheredData<IPath>>
}

export class PathGatheringHandler extends GatheringHandlerBase<IPath> {

  dataType: string = PATH_IDENTIFIER;

  constructor(
    private readonly _gatherer: IPathGatherer,
    _selectorService: SelectorService
  ) { 
    super(_selectorService);
  }

  protected gatherData(p: IGathererPayload<IPath>): Promise<IGatheredData<IPath>> {
    return this._gatherer.gatherPath(p);
  }
}
