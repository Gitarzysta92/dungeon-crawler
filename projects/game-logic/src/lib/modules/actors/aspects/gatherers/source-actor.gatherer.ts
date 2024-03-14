import { IGatheringHandler, IGatherableContext, IGatheredData } from "../../../../cross-cutting/gatherer/data-gatherer.interface";
import { SelectorService } from "../../../../cross-cutting/selector/selector.service";
import { Guid } from "../../../../extensions/types";

export const SOURCE_ACTOR_IDENTIFIER = "SOURCE_ACTOR_IDENTIFIER";


export interface ISourceActorGatherer {
  gatherActorData: (def: IGatherableContext) => Promise<IGatheredData<Guid>>;
}


export class SourceActorGatheringHandler implements IGatheringHandler<Guid> {

  dataType = SOURCE_ACTOR_IDENTIFIER;

  constructor(
    private readonly _gatherer: ISourceActorGatherer,
    private readonly _selectorService: SelectorService
  ) { }
  
  public async gather(data: IGatherableContext): Promise<IGatheredData<Guid>> {
    const result = await this._gatherer.gatherActorData(data);

    return result;
  }
}
