import { IPayloadDefinition, ICollectableData } from "@game-logic/lib/features/effects/commons/payload-collector/effect-payload.interface";

export interface IDungeonInteractionState {
  selectedActivityId: string | undefined;
  payloadDefinitions: IPayloadDefinition[],
  collectedData: ICollectableData[] 
}