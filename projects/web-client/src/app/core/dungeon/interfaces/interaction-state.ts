import { ICollectedData, IPayloadDefinition } from "@game-logic/lib/features/effects/effect-payload.interface";

export interface IDungeonInteractionState {
  payloadDefinitions: IPayloadDefinition[],
  collectedData: ICollectedData[]
}