import { castEffect } from "../../gameplay/shared/activities/cast-effect.activity";
import { finishTurn } from "../../gameplay/dungeon/activities/finish-turn.directive";
import { startTurn } from "../../gameplay/dungeon/activities/start-turn.directive";
import { finishDungeonTurn } from "../../gameplay/shared/activities/dungeon/system/finish-dungeon-turn.directive";
import { startDungeonTurn } from "../../gameplay/shared/activities/dungeon/system/start-dungeon-turn.directive";
import { IDungeonDeckInteractionHandler, IDungeonPlayerInteractionHandler } from "./dungeon-interaction-handler.interface";
import { DungeonStateStore } from "./dungeon-state-store";


export class DungeonGameHarness {
  
  constructor(
    private readonly _dungeonStateStore: DungeonStateStore,
    private readonly _dungeonPlayerInteractionHandler: IDungeonPlayerInteractionHandler,
    private readonly _dungeonDeckInteractionHandler: IDungeonDeckInteractionHandler,
  ) { }


  public async performGame(): Promise<void> {
    while (!this._dungeonStateStore.currentState.isDungeonFinished()) {
      const currentPlayer = this._dungeonStateStore.currentState.gameplayService.getCurrentPlayer();
      if (currentPlayer.isHuman()) {
        await this._makePlayerTurn();
      } else {
        await this._makeDungeonTurn();
      }    
    }
  }


  private async _makePlayerTurn() {
    await this._dungeonStateStore.dispatchActivity(startTurn());
    do {
      var effect = await this._dungeonPlayerInteractionHandler.chooseEffectToCast(this._dungeonStateStore.currentState);
      if (!effect) {
        throw new Error("Effect to cast not specified")
      }
      if (effect.effectName == null) {
        throw new Error("Effect must have specified name")
      }
      await this._castEffect(effect);
    } while (effect !== null)
    await this._dungeonStateStore.dispatchActivity(finishTurn());
  }


  private async _makeDungeonTurn() {
    await this._dungeonStateStore.dispatchActivity(startDungeonTurn());
    do {
      var card = await this._dungeonDeckInteractionHandler.chooseCardToCast(this._dungeonStateStore.currentState);
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
    card: ICard<IEffect>
  ): Promise<{ card: ICard<IEffect>, effectPayload: IEffectPayload | undefined }> {
    const gatheringGenerator = createPayloadGatherer(
      this._dungeonStateStore.currentState,
      {
        caster: {} as any,
        effect: card.effect as any,
        effectName: card.effect.effectName as any,
      },
      this._dungeonDeckInteractionHandler);
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