import { DungeonState } from "../../states/dungeon-state";
import { EffectPayloadCollector } from "./effect-payload-collector";
import { GatheringStepDataName } from "./effect-payload-collector.constants";
import { ICollectableData, ICollectedDataStep } from "./effect-payload.interface";
import { GatheringPayloadHook } from "./effect-resolver.constants";
import { IEffectPayloadProvider, IEffectPayloadProviderResult, IGatherPayloadStep } from "./effect-resolver.interface";
import { IEffectDefinition } from "./payload-definition.interface";

export async function* createPayloadGatherer(
  dungeonState: DungeonState,
  effectDefinition: IEffectDefinition,
  payloadProvider: IEffectPayloadProvider,
): AsyncGenerator<IGatherPayloadStep, IGatherPayloadStep, IGatherPayloadStep> {
  const collector = new EffectPayloadCollector(dungeonState); 
  collector.initializeData(effectDefinition);
  const reverts = [];

  while (!collector.isCompleted) {
    const dataType = collector.getDataTypeToCollect();
    yield {
      name: GatheringPayloadHook.BeforeTypeDataGathered,
      payload: collector.generatePayload(),
      collector
    };
  
    const result = await gatherTypeData(effectDefinition, dataType, payloadProvider);
    reverts.push(result.revertCallback);

    if (result.isDataGathered) {
      collector.collectData(result.dataType, result.data);
      if (collector.isCompleted) {
        break;
      }
      yield {
        name: GatheringPayloadHook.AfterTypeDataGathered,
        payload: collector.generatePayload(),
        collector
      }
    } else {
      reverts.forEach(rc => rc && rc());
      return {
        name: GatheringPayloadHook.GatheringPayloadRejected,
        collector: undefined,
        payload: collector.generatePayload()
      }
    }
  }
  return {
    name: GatheringPayloadHook.GatheringPayloadFinished,
    payload: collector.generatePayload(),
    collector
  }
}

export async function gatherTypeData(
  effectDefinition: IEffectDefinition,
  dataType: ICollectableData & ICollectedDataStep,
  provider: IEffectPayloadProvider
) {
  let result: IEffectPayloadProviderResult<ICollectableData['payload'], ICollectableData> | undefined;
  if (dataType.dataName === GatheringStepDataName.Field) {
    result = await provider.collectFieldTypeData(dataType, effectDefinition);
  }

  if (dataType.dataName === GatheringStepDataName.Effect) {
    result = await provider.collectEffectTypeData(dataType, effectDefinition);
  }

  if (dataType.dataName === GatheringStepDataName.Rotation) {
    result = await provider.collectRotationTypeData(dataType, effectDefinition);
  }

  if (dataType.dataName === GatheringStepDataName.Actor) {
    result = await provider.collectActorTypeData(dataType, effectDefinition);
  }

  if (dataType.dataName === GatheringStepDataName.Origin) {
    result = await provider.collectOriginTypeData(dataType, effectDefinition);
  }

  if (dataType.dataName === GatheringStepDataName.SourceActor) {
    result = await provider.collectSourceActorTypeData(dataType, effectDefinition);
  }

  if (!result) {
    throw new Error(`Cannot find payload data handler for: ${effectDefinition.effectName} - ${dataType.dataName}`);
  }
  return result; 
}
