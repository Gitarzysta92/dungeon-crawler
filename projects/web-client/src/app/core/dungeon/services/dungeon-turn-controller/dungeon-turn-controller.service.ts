import { Injectable } from '@angular/core';
import { DungeonStateStore } from 'src/app/core/dungeon-logic/stores/dungeon-state.store';
import { DungeonArtificialIntelligenceService } from 'src/app/core/dungeon-logic/services/dungeon-artificial-intelligence/dungeon-artificial-intelligence.service';
import { UiInteractionService } from 'src/app/core/dungeon-ui/services/ui-interaction/ui-interaction.service';
import { GatheringPayloadHook } from 'src/app/core/dungeon-logic/constants/gathering-payload-hooks';
import { DungeonSceneStore } from 'src/app/core/dungeon-scene/stores/dungeon-scene.store';
import { DungeonInteractionStore } from '../../stores/dungeon-interaction.store';



@Injectable()
export class DungeonTurnControllerService {

  constructor(
    private readonly _dungeonStateStore: DungeonStateStore,
    private readonly _sceneStateStore: DungeonSceneStore,
    private readonly _dungeonInteractionStore: DungeonInteractionStore,
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
      console.log(params);
      if (!params.effectPayload) {
        continue;
      }
      await this._uiInteractionService.requireDungeonCardAcknowledgement(card, params.effectPayload);
      await transaction.dispatchActivity(playDungeonCard(params));
      await this._sceneStateStore.updateState(transaction.store, this._dungeonInteractionStore.store);
    }

    await transaction.dispatchActivity(finishDungeonTurn());
    await this._dungeonStateStore.dispatchTransaction(transaction);
  }

  private async _createPlayCardPayload(card: Effect): Promise<IEffectPayload | undefined > {
    const resolver = card.initializeCastingProcess(this._dungeonAiService);
    let gatheringStep: IteratorYieldResult<IGatherPayloadStep> | IteratorReturnResult<IGatherPayloadStep>;
    
    do {
      gatheringStep = await resolver.next();
      const { name, payload } = gatheringStep.value;
      if (name === GatheringPayloadHook.GatheringPayloadRejected) {
        return;
      }
      if (name === GatheringPayloadHook.GatheringPayloadFinished) {
        return payload;
      }
    } while(!gatheringStep.done)    
  }
}



    // const gatheringGenerator = createPayloadGatherer(
    //   this._dungeonStateStore.currentState,
    //   {
    //     caster: {} as any,
    //     effect: card.effect as any,
    //     effectName: card.effect.effectName as any,
    //   },
    //   this._dungeonAiService);