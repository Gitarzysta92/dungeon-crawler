import { castEffect } from "../../lib/activities/player-activities/cast-effect.directive";
import { finishTurn } from "../../lib/activities/player-activities/finish-turn.directive";
import { startTurn } from "../../lib/activities/player-activities/start-turn.directive";
import { finishDungeonTurn } from "../../lib/activities/system-activities/finish-dungeon-turn.directive";
import { startDungeonTurn } from "../../lib/activities/system-activities/start-dungeon-turn.directive";
import { IDungeonCard } from "../../lib/features/dungeon/dungeon-deck.interface";
import { createPayloadGatherer } from "../../lib/features/effects/effect-resolver";
import { GatheringPayloadHook } from "../../lib/features/effects/effect-resolver.constants";
import { IGatherPayloadStep } from "../../lib/features/effects/effect-resolver.interface";
import { IEffectPayload } from "../../lib/features/effects/payload-definition.interface";
import { IEffect } from "../../lib/features/effects/resolve-effect.interface";
import { IGameFeed } from "../../lib/states/game.interface";
import { IDungeonDeckInteractionHandler, IDungeonPlayerInteractionHandler } from "./dungeon-interaction-handler.interface";
import { DungeonStateStore } from "./game-harness-state-store";


export class DungeonGameHarness {
  
  constructor(
    private readonly _dataFeed: IGameFeed,
    private readonly _dungeonStateStore: DungeonStateStore,
    private readonly _dungeonPlayerInteractionHandler: IDungeonPlayerInteractionHandler,
    private readonly _dungeonDeckInteractionHandler: IDungeonDeckInteractionHandler,
  ) { }


  public async performGame(): Promise<void> {
    while (!this._dungeonStateStore.currentState.isDungeonFinished) {
      if (this._dungeonStateStore.currentState.isPlayerTurn()) {
        await this._makePlayerTurn();
      }
      if (this._dungeonStateStore.currentState.isDungeonFinished) {
        break;
      }
      await this._makeDungeonTurn();
    }
  }


  private async _makePlayerTurn() {
    await this._dungeonStateStore.dispatchActivity(startTurn());
    do {
      var effect = await this._dungeonPlayerInteractionHandler.chooseEffectToCast()
      if (effect) {
        await this._castEffect(effect);
      }
    } while (effect !== null)
    await this._dungeonStateStore.dispatchActivity(finishTurn());
  }


  private async _makeDungeonTurn() {
    await this._dungeonStateStore.dispatchActivity(startDungeonTurn());
    do {
      var card = await this._dungeonAiInteractionService.chooseCardToCast();
      this._playCard(card);
  
    } while (this._dungeonStateStore.currentState.deck.cardsToUtilize.length > 0)
    
    await this._dungeonStateStore.dispatchActivity(finishDungeonTurn()); 
  }



  private async _castEffect(effect: IEffect): Promise<void> {
    //TODO - remove any assertion
    const payloadGatherer = createPayloadGatherer(this._dungeonStateStore.currentState,
      {
        caster: this._dungeonStateStore.currentState.hero,
        effect: effect as any,
        effectName: effect.effectName as any,
      },
      this._dungeonPlayerInteractionHandler
    );
    
    let gatheringStep: IteratorYieldResult<IGatherPayloadStep> | IteratorReturnResult<IGatherPayloadStep>
    do {
      gatheringStep = await payloadGatherer.next();
      const { name, payload } = gatheringStep.value;
      if (name === GatheringPayloadHook.GatheringPayloadRejected) {
        throw new Error("CastEffect: Payload cannot be gathered");
      }
      if (name === GatheringPayloadHook.GatheringPayloadFinished) {
       await this._dungeonStateStore.dispatchActivity(castEffect(payload!));
      }
    } while(!gatheringStep.done)
  }


  private async _playCard(
    card: IDungeonCard<IEffect>
  ): Promise<{ card: IDungeonCard<IEffect>, effectPayload: IEffectPayload | undefined }> {
    const gatheringGenerator = createPayloadGatherer(
      this._dungeonStateStore.currentState,
      {
        caster: {} as any,
        effect: card.effect as any,
        effectName: card.effect.effectName as any,
      },
      this._dungeonAiInteractionService);
      let gatheringStep: IteratorYieldResult<IGatherPayloadStep> | IteratorReturnResult<IGatherPayloadStep>;
    
    do {
      gatheringStep = await gatheringGenerator.next();
      const { name, payload } = gatheringStep.value;
      if (name === GatheringPayloadHook.GatheringPayloadRejected) {
        throw new Error("PlayCard: Payload cannot be gathered");
      }
      if (name === GatheringPayloadHook.GatheringPayloadFinished) {
        return { card: card, effectPayload: payload  };
      }
    } while(!gatheringStep.done)  
  }
}