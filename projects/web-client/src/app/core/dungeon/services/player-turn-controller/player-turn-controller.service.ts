import { Injectable } from "@angular/core";
import { validatePossibilityToInteractActor } from "@game-logic/lib/activities/player-activities/make-actor-interaction.directive";
import { Observable, firstValueFrom, map, race, switchMap } from "rxjs";
import { DungeonStateStore } from "src/app/core/dungeon-logic/stores/dungeon-state.store";
import { SceneInteractionService } from "src/app/core/dungeon-scene/api";
import { UiInteractionService } from "src/app/core/dungeon-ui/services/ui-interaction/ui-interaction.service";
import { EffectPayloadProviderService } from "../effect-payload-provider/effect-payload-provider.service";
import { CastEffectUiActivity, ClaimTreasureUiActivity, LeaveDungeonUiActivity, FinishTurnUiActivity, InteractCharacterUiActivity } from "src/app/core/dungeon-ui/services/ui-interaction/ui-activity";
import { DungeonInteractionStore } from "../../stores/dungeon-interaction.store";
import { finishTurn } from '@game-logic/lib/activities/player-activities/finish-turn.directive';
import { leaveDungeon } from "@game-logic/lib/activities/player-activities/leave-dungeon.directive";
import { IDungeonViewModel } from "../../interfaces/view-model.interface";
import { EffectResolverService } from "src/app/core/dungeon-logic/services/effect-resolver/effect-resolver.service";
import { EffectPayloadCollector } from "@game-logic/lib/features/effects/effect-payload-collector";
import { castEffect } from "@game-logic/lib/activities/player-activities/cast-effect.directive";


@Injectable()
export class PlayerTurnControllerService {
  
  public get selectedEffect() { return this._effectResolverService.resolvingEffect }

  constructor(
    private readonly _dungeonStateStore: DungeonStateStore,
    private readonly _dungeonInteractionStore: DungeonInteractionStore,
    private readonly _sceneInteractionService: SceneInteractionService,
    private readonly _uiInteractionService: UiInteractionService,
    private readonly _effectResolverService: EffectResolverService,
    private readonly _effectPayloadProviderService: EffectPayloadProviderService,
  ) { }

  public async handlePlayerTurn(viewState$: Observable<IDungeonViewModel>) {
    while (!this._dungeonStateStore.currentState.isTurnFinished) {
      const activity = await firstValueFrom(race(
        this._uiInteractionService.onActivitySelect,
        this._listenForActorInteraction()
          .pipe(switchMap(id => viewState$.pipe(map(s => s.activities.find(a => a.id === id)))))
      ));
        
      if (!activity) {
        throw new Error('Cannot find activity');
      }

      this._dungeonInteractionStore.updateState({ selectedActivityId: activity.id });

      if (activity instanceof CastEffectUiActivity) {
        await this._castEffect(activity.data);
      } else if (activity instanceof ClaimTreasureUiActivity) {
        
      } else if (activity instanceof InteractCharacterUiActivity) {
        
      } else if (activity instanceof FinishTurnUiActivity) {
        this._finishTurn();
      } else if (activity instanceof LeaveDungeonUiActivity) {
        await this._leaveDungeon(activity);
      } 

      this._emitEmptyStateOfPayloadCollector();
    }
  }

  private async _castEffect(effect: IEffect): Promise<void> {
    const gatheringGenerator = this._effectResolverService.gatherPayload(effect, this._effectPayloadProviderService)
    for await (let gatheringStep of gatheringGenerator) {
      this._emitCurrentStateOfPayloadCollector(gatheringStep.payloadCollector);
      if (gatheringStep) {

      } 
    }
    this._dungeonStateStore.dispatchActivity(castEffect({ effect: effect, effectData: gatheringGenerator.generatedPayload }));
  }

  private _finishTurn(): void {
    this._dungeonStateStore.dispatchActivity(finishTurn());
  }

  private async _leaveDungeon(activity: LeaveDungeonUiActivity): Promise<void> {
    const isLeaving = await this._uiInteractionService.requireMakeLeaveDungeonDecision();
    if (isLeaving) {
      this._dungeonStateStore.dispatchActivity(finishTurn());
      this._dungeonStateStore.dispatchActivity(leaveDungeon({ exit: activity.data }))
    }
  }

  private _listenForActorInteraction(): Observable<string> {
    const possibleActorInteractionIds = Object.values(this._dungeonStateStore.currentState.board.objects)
      .filter(a => validatePossibilityToInteractActor(this._dungeonStateStore.currentState, { actorId: a.id }))
      .map(i => i.id);
    return this._sceneInteractionService.listenForInteractionsWithActors(possibleActorInteractionIds)
      .pipe(map(to => to.auxId))
  }


  private _emitCurrentStateOfPayloadCollector(payloadCollector: EffectPayloadCollector): void {
    this._dungeonInteractionStore.updateState({
      selectedActivityId: this._effectResolverService.resolvingEffect?.id,
      payloadDefinitions: payloadCollector.payloadDefinitions,
      collectedData: payloadCollector.collectedData
    });
  }

  private _emitEmptyStateOfPayloadCollector(): void {
    this._dungeonInteractionStore.updateState({
      selectedActivityId: undefined,
      payloadDefinitions: [],
      collectedData: []
    });
  }
  
 
}