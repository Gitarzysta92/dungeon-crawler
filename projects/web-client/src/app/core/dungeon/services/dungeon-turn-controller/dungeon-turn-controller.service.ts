import { Injectable } from '@angular/core';
import { DungeonStateStore } from 'src/app/core/dungeon-logic/stores/dungeon-state.store';
import { DungeonArtificialIntelligenceService } from 'src/app/core/dungeon-logic/services/dungeon-artificial-intelligence/dungeon-artificial-intelligence.service';
import { startDungeonTurn } from '@game-logic/lib/activities/system-activities/start-dungeon-turn.directive';
import { playDungeonCard } from "@game-logic/lib/activities/system-activities/play-dungeon-card.directive";
import { UiInteractionService } from 'src/app/core/dungeon-ui/services/ui-interaction/ui-interaction.service';
import { EffectResolverService } from 'src/app/core/dungeon-logic/services/effect-resolver/effect-resolver.service';
import { IDungeonCard } from '@game-logic/lib/features/dungeon/dungeon-deck.interface';
import { GatheringPayloadHook } from 'src/app/core/dungeon-logic/constants/gathering-payload-hooks';
import { IEffect } from '@game-logic/lib/features/effects/resolve-effect.interface';
import { IGatherPayloadStep } from 'src/app/core/dungeon-logic/interfaces/effect-resolver.interface';
import { IEffectPayload } from '@game-logic/lib/features/effects/payload-definition.interface';
import { DungeonSceneStore } from 'src/app/core/dungeon-scene/stores/dungeon-scene.store';
import { DungeonInteractionStore } from '../../stores/dungeon-interaction.store';
import { finishDungeonTurn } from "@game-logic/lib/activities/system-activities/finish-dungeon-turn.directive";


@Injectable()
export class DungeonTurnControllerService {

  constructor(
    private readonly _dungeonStateStore: DungeonStateStore,
    private readonly _sceneStateStore: DungeonSceneStore,
    private readonly _dungeonInteractionStore: DungeonInteractionStore,
    private readonly _effectResolverService: EffectResolverService,
    private readonly _dungeonAiService: DungeonArtificialIntelligenceService,
    private readonly _uiInteractionService: UiInteractionService,
  ) { }

  public async makeDungeonTurn() {
    const transaction = this._dungeonStateStore.startTransaction(this._dungeonStateStore.currentState);

    transaction.dispatchActivity(startDungeonTurn());

    const cardsToUtilize = this._dungeonAiService.determineCardsOrder(transaction.store.currentState.deck.cardsToUtilize);
    while (cardsToUtilize.length !== 0) {
      const card = cardsToUtilize.shift();
      const params = await this._createPlayCardPayload(card);
      if (!params.effectPayload) {
        continue;
      }
      await this._uiInteractionService.requireDungeonCardAcknowledgement(card, params.effectPayload);
      transaction.dispatchActivity(playDungeonCard(params));
      await this._sceneStateStore.updateState(transaction.store, this._dungeonInteractionStore.store);
    }

    await transaction.dispatchActivity(finishDungeonTurn());
    //await (new Promise(() => {}))
    await this._dungeonStateStore.dispatchTransaction(transaction);
  }

  private async _createPlayCardPayload(
    card: IDungeonCard<IEffect>
  ): Promise<{ card: IDungeonCard<IEffect>, effectPayload: IEffectPayload | undefined }> {
    //TODO - remove any assertion
    const gatheringGenerator = this._effectResolverService.gatherPayload({
      caster: {} as any,
      effect: card.effect as any,
      effectName: card.effect.effectName as any,
    }, this._dungeonAiService);
    let gatheringStep: IteratorYieldResult<IGatherPayloadStep> | IteratorReturnResult<IGatherPayloadStep>;
    
    do {
      gatheringStep = await gatheringGenerator.next();
      const { name, payload } = gatheringStep.value;
      if (name === GatheringPayloadHook.GatheringPayloadRejected) {
        return { card, effectPayload: undefined }
      }
      if (name === GatheringPayloadHook.GatheringPayloadFinished) {
        return { card: card, effectPayload: payload  };
      }
    } while(!gatheringStep.done)    
  }
}
