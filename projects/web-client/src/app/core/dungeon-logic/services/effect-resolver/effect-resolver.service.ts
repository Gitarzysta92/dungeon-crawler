import { Injectable } from '@angular/core';
import { castEffect } from '@game-logic/lib/activities/player-activities/cast-effect.directive';
import { IEffect } from '@game-logic/lib/features/effects/effect-commons.interface';
import { EffectPayloadCollector } from '@game-logic/lib/features/effects/effect-payload-collector';
import { DungeonStateStore } from '../../stores/dungeon-state.store';
import { IEffectPayloadProvider, IEffectPayloadProviderResult } from '../../interfaces/effect-payload-provider';
import { IActor, IBasicStats } from '@game-logic/lib/features/actors/actors.interface';
import { ICollectableData } from '@game-logic/lib/features/effects/effect-payload.interface';



@Injectable()
export class EffectResolverService {

  public effectsStack: IEffect[] = [];
  _effectResolverService: any;
  _revertCallbacks: any;
  public get resolvingEffect() {
    return this.effectsStack[0] as IEffect
  };

  private _selectedField: FieldObject | undefined;
  private _revertCallbacks: (() => void)[] = [];


  constructor(
    private readonly _dungeonState: DungeonStateStore
  ) { }

  public async *gatherPayload(
    effect: IEffect,
    payloadProvider: IEffectPayloadProvider,
    caster?: IActor & IBasicStats,
  ) {
    const collector = new EffectPayloadCollector(this._dungeonState.currentState); 
    collector.initializeData(effect, caster);
    const reverts = [];

    while (!collector.isCompleted) {
      const dataType = collector.getDataTypeToCollect();
      yield "before gather payload";
      
      const result = await this._gatherPayload(effect, dataType, payloadProvider);
      reverts.push(result.revertCallback);

      if (result.data) {
        collector.collectData(result.dataType, result.data);
        yield "after payload gathered successfully"
      } else {
        this._revertCallbacks.forEach(rc => rc());
        this._effectResolverService.removeEffect(effect);
        return;
      }
    }
    //this._revertCallbacks.length = 0;
    //this._effectResolverService.resolveEffect(effectPayloadCollector);
    return collector.generatePayload();
  }

  private async _gatherPayload(
    effect: IEffect,
    dataType: ICollectableData,
    provider: IEffectPayloadProvider
  ) {
    let result: IEffectPayloadProviderResult<unknown> | undefined;
    if (dataType.dataName === 'field') {
      result = await provider.collectFieldTypeData(dataType, effect);
    }

    if (dataType.dataName === 'effect') {
      result = await provider.collectEffectTypeData(dataType, effect);
    }

    if (dataType.dataName === 'rotation') {
      result = await provider.collectRotationTypeData(dataType, effect);
    }

    if (dataType.dataName === 'actor') {
      result = await provider.collectActorTypeData(dataType, effect);
    }

    if (!result) {
      throw new Error(`Cannot find payload data handler for: ${effect.effectName} - ${dataType.dataName}`);
    }
    return result; 
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

  public removeEffect(effect?: IEffect): void {
    if (effect) {
      this.effectsStack = this.effectsStack.filter(e => e.id !== effect.id);
    } else {
      this.effectsStack.shift();
    }
  }

  public resolveEffect(payloadCollector: EffectPayloadCollector): void {
    const payload = payloadCollector.generatePayload();
    this._dungeonState.dispatchActivity(castEffect({
      effect: this.resolvingEffect,
      effectData: payload
    }));

    this.removeEffect();
  }

  private _getAllAssociatedEffects(effect: IEffect): IEffect[] {
    const effects = effect.secondaryEffects?.reduce((a, e) =>
      a.concat(this._getAllAssociatedEffects(e as IEffect)), []);
    if (effects?.length > 0) {
      effects.push(effect);
    }
    return effects ?? [effect]
  }
  
  private _addItemsToQueue(effects: IEffect[] | IEffect): void {
    if (!Array.isArray(effects)) {
      effects = [effects]
    }
    effects.forEach(e => {
      this.effectsStack.push(JSON.parse(JSON.stringify(e)));
    })
  }

}
