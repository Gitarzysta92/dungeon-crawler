import { IGatheredData, IGathererPayload } from "../../../../cross-cutting/gatherer/data-gatherer.interface";
import { GatheringHandler } from "../../../../cross-cutting/gatherer/data-gathering-handler";
import { SelectorService } from "../../../../cross-cutting/selector/selector.service";
import { IBoardField } from "../../entities/board-field/board-field.interface";

export const BOARD_FIELD_IDENTIFIER = "BOARD_FIELD_GATHERING_HANDLER_IDENTIFIER"; 

export interface IBoardFieldGatherer {
  gatherRotation: (payload: IGathererPayload<IBoardField[]>) => Promise<IGatheredData<IBoardField[]>>
}

export class BoardFieldGatheringHandler extends GatheringHandler<IBoardField[]> {

  dataType: string = BOARD_FIELD_IDENTIFIER;

  constructor(
    private readonly _gatherer: IBoardFieldGatherer,
    _selectorService: SelectorService
  ) { 
    super(_selectorService);
  }

  protected gatherData(p: IGathererPayload<IBoardField[]>): Promise<IGatheredData<IBoardField[]>> {
    return this._gatherer.gatherRotation(p);
  }
}
