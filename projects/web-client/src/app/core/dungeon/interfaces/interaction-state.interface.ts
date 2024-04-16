import { IGatheredData } from "@game-logic/lib/cross-cutting/gatherer/data-gatherer.interface";

export interface IDungeonInteractionState {
  selectedActivityId: string | undefined;
  payloadDefinitions: IPayloadDefinition[],
  collectedData: IGatheredData<unknown>[]
}