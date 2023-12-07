import { ICollectableData, IPayloadDefinition } from "@game-logic/lib/features/effects/effect-payload.interface";

export interface IDungeonInteractionState {
  selectedActivityId: string | undefined;
  payloadDefinitions: IPayloadDefinition[],
  collectedData: ICollectableData[]
}