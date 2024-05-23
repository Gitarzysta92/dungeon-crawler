import { Guid } from "../../infrastructure/extensions/types";
import { SelectorService } from "../selector/selector.service";
import { IGatherableContext, IGatheredData, IGathererPayload } from "./data-gatherer.interface";
import { AutoGatherMode } from "./data-gathering.constants";


export abstract class GatheringHandler<T> {

  protected abstract dataType: string;

  constructor(
    private readonly _selectorService: SelectorService
  ) { }
  
  protected abstract gatherData(p: IGathererPayload<T>): Promise<IGatheredData<T>>;

  public async gather(context: IGatherableContext & { prev: IGatheredData<T>[], data: { payload: T } }): Promise<IGatheredData<T>> {
    const allowedData = this._selectorService.process(context.data.selectors);

    let payload = context.data.payload;
    if (context.data.autogather.mode === AutoGatherMode.AllSelected) {
      payload = allowedData as T;
    }

    if (context.data.autogather.mode === AutoGatherMode.Specified) {
      payload = allowedData.slice(0, context.data.autogather.amount) as T;
    }

    if (payload && context.data.requireUniqueness) {
      payload = this._forceUniqueness(payload, context.prev);
    }

    if (payload) {
      return {
        payload: payload,
        isDataGathered: true,
        attemptWasMade: true,
        gatheringTerminated: false
      }
    }

    const gathererResult = await this.gatherData({
      dataType: context.data.dataType,
      allowedData: allowedData as T,
      gathererParams: context.data.gathererParams,
      prev: context.prev as IGatheredData<T>[],
      context: context.context
    })

    return gathererResult;
  }

  private _forceUniqueness(payload: T, context: IGatheredData<T>[]): T | undefined {
    if (Array.isArray(payload)) {
      const uniquePayload = [];
      for (const p of payload) {
        let foundInContext = false;
        for (const ctx of context) {
          if (Array.isArray(ctx.payload)) {
            foundInContext = ctx.payload.some(a => this._comparePayloadItem(a, p));
          } else {
            foundInContext = this._comparePayloadItem(ctx.payload, p);
          }
          if (!foundInContext) {
            uniquePayload.push(p);
          }  
        }
      }
      return uniquePayload as T;
    }

    for (const ctx of context) {
      if (Array.isArray(ctx.payload) && ctx.payload.some(a => this._comparePayloadItem(a, payload))) {
        return;
      }
      if (this._comparePayloadItem(ctx.payload, payload)) {
        return;
      }  
    }

    return payload;
  }

  private _comparePayloadItem(a: { id?: Guid }, b: { id?: Guid }): boolean {
    if (a.id && b.id) {
      return a.id === b.id;
    } else
      return a === b;
  }
}