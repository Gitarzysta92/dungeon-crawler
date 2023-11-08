import { Injectable } from '@angular/core';
import { DungeonStateStore } from 'src/app/core/dungeon-logic/stores/dungeon-state.store';
import { makeDungeonTurn } from '@game-logic/lib/activities/system-activities/make-dungeon-turn.directive';
import { DungeonCardResolverService } from 'src/app/core/dungeon-logic/services/dungeon-card-resolver/dungeon-card-resolver.service';
import { DungeonArtificialIntelligenceService } from 'src/app/core/dungeon-logic/services/dungeon-artificial-intelligence/dungeon-artificial-intelligence.service';
import { EffectPayloadCollector } from '@game-logic/lib/features/effects/effect-payload-collector';
import { IEffectPayload } from '@game-logic/lib/features/effects/effect-commons.interface';

@Injectable()
export class DungeonTurnControllerService {

  constructor(
    private readonly _dungeonStateStore: DungeonStateStore,
    private readonly _dungeonCardResolverService: DungeonCardResolverService,
    private readonly _dungeonAiService: DungeonArtificialIntelligenceService
  ) { }

  public makeDungeonTurn() {
    const state = this._dungeonStateStore.currentState;
    const cardsToUtilize = [...state.deck.cardsToUtilize];

    let payloads = [];
    while (cardsToUtilize.length !== 0) {
      const card = cardsToUtilize.shift();
      const effectsQueue = this._dungeonCardResolverService.processCard(card);
      const payload = effectsQueue.map(e => this._collectData(e.collector));
      payloads = payloads.concat(payload);
    }
    this._dungeonStateStore.dispatchActivity(makeDungeonTurn({ params: payloads }))
  }

  private _collectData(collector: EffectPayloadCollector): IEffectPayload | undefined {
    while (!collector.isCompleted) {
      const dataType = collector.getDataTypeToCollect();
      if (dataType.dataName === 'field') {
        const field = this._dungeonAiService.findAvailableField()
        if (!field) {
          return;
        }
        collector.collectData(dataType, field);
      }

      if (dataType.dataName === 'effect') {
        const effect = this._dungeonAiService.findAvailableEffect()
        if (!effect) {
          return;
        }
        collector.collectData(dataType, effect);
      }

      if (dataType.dataName === 'rotation') {
        const rotation = this._dungeonAiService.findAvailableRotation()
        if (rotation == null) {
          return;
        }
        collector.collectData(dataType, rotation);
      }

      if (dataType.dataName === 'actor') {
        const actor = this._dungeonAiService.findAvailableActor()
        if (actor == null) {
          return;
        }
        collector.collectData(dataType, actor);
      }
    }
    return collector.generatePayload()
  }
}
