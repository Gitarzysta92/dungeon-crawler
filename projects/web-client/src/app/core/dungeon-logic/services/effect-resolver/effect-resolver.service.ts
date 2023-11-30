import { Injectable } from '@angular/core';
import { EffectPayloadCollector } from '@game-logic/lib/features/effects/effect-payload-collector';
import { DungeonStateStore } from '../../stores/dungeon-state.store';
import { IEffectPayloadProvider, IEffectPayloadProviderResult } from '../../interfaces/effect-payload-provider';
import { ICollectableData, ICollectedDataStep } from '@game-logic/lib/features/effects/effect-payload.interface';
import { GatheringPayloadHook } from '../../constants/gathering-payload-hooks';
import { IGatherPayloadStep } from '../../interfaces/effect-resolver';
import { IEffectDefinition } from '@game-logic/lib/features/effects/payload-definition.interface';
import { GatheringStepDataName } from '@game-logic/lib/features/effects/effect-payload-collector.constants';


@Injectable()
export class EffectResolverService {

  // public effectsStack: IEffect[] = [];
  // _effectResolverService: any;
  // _revertCallbacks: any;
  // public get resolvingEffect() {
  //   return this.effectsStack[0] as IEffect
  // };

  constructor(
    private readonly _dungeonState: DungeonStateStore
  ) { }

  public async *gatherPayload(
    effectDefinition: IEffectDefinition,
    payloadProvider: IEffectPayloadProvider,
  ): AsyncGenerator<IGatherPayloadStep, IGatherPayloadStep, IGatherPayloadStep> {
    const collector = new EffectPayloadCollector(this._dungeonState.currentState); 
    collector.initializeData(effectDefinition);
    const reverts = [];

    while (!collector.isCompleted) {
      const dataType = collector.getDataTypeToCollect();
      yield {
        name: GatheringPayloadHook.BeforeTypeDataGathered,
        payload: collector.generatePayload(),
        collector
      };
    
      const result = await this._gatherTypeData(effectDefinition, dataType, payloadProvider);
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
        reverts.forEach(rc => rc());
        return {
          name: GatheringPayloadHook.GatheringPayloadRejected,
          collector: null,
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

  private async _gatherTypeData(
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


}




  // public selectEffect(effect?: IEffect): EffectPayloadCollector {
  //   if (!this.effectsStack.find(e => e.id === effect.id)) {
  //     this._addItemsToQueue(this._getAllAssociatedEffects(effect))
  //   }

  //   if ('selectorType' in this.resolvingEffect) {
  //     this.resolvingEffect.selectorOriginCoordinates = this._dungeonState.currentState.hero.position!;
  //     //this.resolvingEffect.outlets = this._dungeonState.currentState.hero.rotation!;
  //   }


  //   return collector;
  // } 

  // public removeEffect(effect?: IEffect): void {
  //   if (effect) {
  //     this.effectsStack = this.effectsStack.filter(e => e.id !== effect.id);
  //   } else {
  //     this.effectsStack.shift();
  //   }
  // }

  // public resolveEffect(payloadCollector: EffectPayloadCollector): void {
  //   const payload = payloadCollector.generatePayload();
  //   this._dungeonState.dispatchActivity(castEffect({
  //     effect: this.resolvingEffect,
  //     effectData: payload
  //   }));

  //   this.removeEffect();
  // }

  // private _getAllAssociatedEffects(effect: IEffect): IEffect[] {
  //   const effects = effect.secondaryEffects?.reduce((a, e) =>
  //     a.concat(this._getAllAssociatedEffects(e as IEffect)), []);
  //   if (effects?.length > 0) {
  //     effects.push(effect);
  //   }
  //   return effects ?? [effect]
  // }
  
  // private _addItemsToQueue(effects: IEffect[] | IEffect): void {
  //   if (!Array.isArray(effects)) {
  //     effects = [effects]
  //   }
  //   effects.forEach(e => {
  //     this.effectsStack.push(JSON.parse(JSON.stringify(e)));
  //   })
  // }