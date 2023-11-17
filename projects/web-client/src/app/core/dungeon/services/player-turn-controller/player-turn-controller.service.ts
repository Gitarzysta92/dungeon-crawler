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
import { IEffect } from "@game-logic/lib/features/effects/effects-commons.interface";
import { GatheringPayloadHook } from "src/app/core/dungeon-logic/constants/gathering-payload-hooks";


@Injectable()
export class PlayerTurnControllerService {
  

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
    const gatheringGenerator = this._effectResolverService.gatherPayload(effect, this._effectPayloadProviderService);
    let gatheringStep;
    do {
      gatheringStep = await gatheringGenerator.next();
      const { name, payload, collector } = gatheringStep.value;
      if (name === GatheringPayloadHook.BeforeTypeDataGathered || name === GatheringPayloadHook.AfterTypeDataGathered) {
        this._emitCurrentStateOfPayloadCollector(collector);
      }
      if (name === GatheringPayloadHook.GatheringPayloadRejected) {
        this._emitEmptyStateOfPayloadCollector();
      }
      if (name === GatheringPayloadHook.GatheringPayloadFinished) {
        this._dungeonStateStore.dispatchActivity(castEffect({ effect: effect, effectData: payload }));
      }
    } while(!gatheringStep.done)
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
      selectedActivityId: payloadCollector.effect.id,
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