export interface IDungeonInteractionState {
  selectedActivityId: string | undefined;
  payloadDefinitions: IPayloadDefinition[],
  collectedData: ICollectableData[] 
}