import { Injectable } from '@angular/core';
import { DungeonStateStore } from 'src/app/core/dungeon-logic/stores/dungeon-state.store';
import { DungeonArtificialIntelligenceService } from 'src/app/core/dungeon-logic/services/dungeon-artificial-intelligence/dungeon-artificial-intelligence.service';
import { startDungeonTurn } from '@game-logic/lib/activities/system-activities/start-dungeon-turn.directive';
import { finishDungeonTurn } from "@game-logic/lib/activities/system-activities/finish-dungeon-turn.directive";
import { playDungeonCard } from "@game-logic/lib/activities/system-activities/play-dungeon-card.directive";
import { UiInteractionService } from 'src/app/core/dungeon-ui/services/ui-interaction/ui-interaction.service';
import { EffectResolverService } from 'src/app/core/dungeon-logic/services/effect-resolver/effect-resolver.service';
import { IDungeonCard } from '@game-logic/lib/features/dungeon/dungeon-deck.interface';

@Injectable()
export class DungeonTurnControllerService {

  constructor(
    private readonly _dungeonStateStore: DungeonStateStore,
    private readonly _effectResolverService: EffectResolverService,
    private readonly _dungeonAiService: DungeonArtificialIntelligenceService,
    private readonly _uiInteractionService: UiInteractionService
  ) { }

  public async makeDungeonTurn() {
    this._dungeonStateStore.dispatchActivity(startDungeonTurn());
    const state = this._dungeonStateStore.currentState;
    const cardsToUtilize = this._dungeonAiService.determineCardsOrder(state.deck.cardsToUtilize);

    while (cardsToUtilize.length !== 0) {
      const card = cardsToUtilize.shift();
      await this._playCard(card);
    }

    this._dungeonStateStore.dispatchActivity(finishDungeonTurn());
  }

  private async _playCard(card: IDungeonCard<IEffect>): Promise<void> {
    const gatheringGenerator = this._effectResolverService.gatherPayload(card.effect, this._dungeonAiService);
    for await (let gatheringStep of gatheringGenerator) {
      await this._uiInteractionService.requireDungeonCardAcknowledgement(card, payload);
      if (gatheringStep) {

      } 
    }
    if (!payload) {
      return;
    }
    this._dungeonStateStore.dispatchActivity(playDungeonCard({ card: card, params: payload }));
  }
}
