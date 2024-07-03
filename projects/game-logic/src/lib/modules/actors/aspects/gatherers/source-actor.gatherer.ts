import { IGatheringContext, IGatheredData, IGatheringHandler } from "../../../../cross-cutting/gatherer/data-gatherer.interface";
import { SelectorService } from "../../../../cross-cutting/selector/selector.service";
import { Guid } from "../../../../infrastructure/extensions/types";

export const SOURCE_ACTOR_IDENTIFIER = "SOURCE_ACTOR_IDENTIFIER";


export interface ISourceActorGatherer {
  gatherActorData: (def: IGatheringContext) => Promise<IGatheredData<Guid>>;
}


export class SourceActorGatheringHandler implements IGatheringHandler<Guid> {

  dataType = SOURCE_ACTOR_IDENTIFIER;

  constructor(
    private readonly _gatherer: ISourceActorGatherer,
    private readonly _selectorService: SelectorService
  ) { }
  
  public async gather(data: IGatheringContext): Promise<IGatheredData<Guid>> {
    const result = await this._gatherer.gatherActorData(data);

    return result;
  }
}
