import { IGatheredData } from "../../../../cross-cutting/gatherer/data-gatherer.interface";
import { IGathererPayload, GatheringHandlerBase } from "../../../../cross-cutting/gatherer/data-gathering-handler-base";

import { SelectorService } from "../../../../cross-cutting/selector/selector.service";
import { IActor } from "../../entities/actor/actor.interface";


export const ACTOR_IDENTIFIER = "ACTOR_IDENTIFIER";

export interface IActorGatherer {
  gatherActorData: (payload: IGathererPayload<IActor[]>) => Promise<IGatheredData<IActor[]>>;
}

export class ActorGatheringHandler extends GatheringHandlerBase<IActor[]> {

  dataType: string = ACTOR_IDENTIFIER;

  constructor(
    private readonly _gatherer: IActorGatherer,
    _selectorService: SelectorService
  ) { 
    super(_selectorService);
  }

  protected gatherData(p: IGathererPayload<IActor[]>): Promise<IGatheredData<IActor[]>> {
    return this._gatherer.gatherActorData(p);
  }
}

