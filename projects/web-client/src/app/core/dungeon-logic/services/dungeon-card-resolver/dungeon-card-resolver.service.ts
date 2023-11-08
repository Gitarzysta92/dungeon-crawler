import { Injectable } from '@angular/core';
import { castEffect } from '@game-logic/lib/activities/player-activities/cast-effect.directive';
import { IDungeonCard } from '@game-logic/lib/features/dungeon/dungeon-deck.interface';
import { IEffect } from '@game-logic/lib/features/effects/effect-commons.interface';
import { EffectPayloadCollector } from '@game-logic/lib/features/effects/effect-payload-collector';
import { DungeonStateStore } from '../../stores/dungeon-state.store';


@Injectable()
export class DungeonCardResolverService {

  constructor(
    private readonly _dungeonState: DungeonStateStore
  ) { }

  public processCard(card: IDungeonCard<IEffect>): { cardId: string, collector: EffectPayloadCollector }[] {
    return card.effects.map(e => {
      const collector = new EffectPayloadCollector(this._dungeonState.currentState)
      collector.initializeData(e)
      return { cardId: card.id, collector }
    })
  }

  public resolveCardEffect(effect: IEffect, payloadCollector: EffectPayloadCollector): void {
    const payload = payloadCollector.generatePayload();
    this._dungeonState.dispatchActivity(castEffect({
      effect: effect,
      effectData: payload
    }));
  }

}
