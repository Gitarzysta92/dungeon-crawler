import { Injectable } from '@angular/core';
import { castEffect } from '@game-logic/lib/activities/player-activities/cast-effect.directive';
import { IEffect } from '@game-logic/lib/features/effects/effect-commons.interface';
import { EffectPayloadCollector } from '@game-logic/lib/features/effects/effect-payload-collector';
import { DungeonStateStore } from '../../stores/dungeon-state.store';



@Injectable()
export class EffectResolverService {

  public effectsStack: IEffect[] = [];
  public get resolvingEffect() {
    return this.effectsStack[0] as IEffect
  };

  constructor(
    private readonly _dungeonState: DungeonStateStore
  ) { }

  public selectEffect(effect?: IEffect): EffectPayloadCollector {
    if (!this.effectsStack.find(e => e.id === effect.id)) {
      this._addItemsToQueue(this._getAllAssociatedEffects(effect))
    }

    if ('selectorType' in this.resolvingEffect) {
      this.resolvingEffect.selectorOrigin = this._dungeonState.currentState.hero.position!;
      this.resolvingEffect.selectorDirection = this._dungeonState.currentState.hero.rotation!;
    }

    const collector = new EffectPayloadCollector(this._dungeonState.currentState); 
    collector.initializeData(this.resolvingEffect);
    return collector;
  }

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
