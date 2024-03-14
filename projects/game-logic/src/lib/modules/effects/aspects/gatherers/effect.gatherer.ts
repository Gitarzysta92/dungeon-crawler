
import { IGatheredData } from "../../../../cross-cutting/gatherer/data-gatherer.interface";
import { IGathererPayload, GatheringHandlerBase } from "../../../../cross-cutting/gatherer/data-gathering-handler-base";
import { SelectorService } from "../../../../cross-cutting/selector/selector.service";
import { IEffect } from "../../entities/effect.interface";

export const EFFECT_IDENTIFIER = "EFFECT_IDENTIFIER"; 


export interface IEffectGatherer {
  gatherEffectData: (payload: IGathererPayload<IEffect[]>) => Promise<IGatheredData<IEffect[]>>;
}

export class EffectGatheringHandler extends GatheringHandlerBase<IEffect[]> {

  dataType: string = EFFECT_IDENTIFIER;

  constructor(
    private readonly _gatherer: IEffectGatherer,
    _selectorService: SelectorService
  ) { 
    super(_selectorService)
  }
  
  protected gatherData(p: IGathererPayload<IEffect[]>): Promise<IGatheredData<IEffect[]>> {
    return this._gatherer.gatherEffectData(p);
  }
}