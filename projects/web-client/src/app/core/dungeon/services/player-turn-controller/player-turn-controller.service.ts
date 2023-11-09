import { Injectable } from "@angular/core";
import { validatePossibilityToInteractActor } from "@game-logic/lib/activities/player-activities/make-actor-interaction.directive";
import { Observable, firstValueFrom, map, race, switchMap } from "rxjs";
import { DungeonStateStore } from "src/app/core/dungeon-logic/stores/dungeon-state.store";
import { SceneInteractionService } from "src/app/core/dungeon-scene/api";
import { UiInteractionService } from "src/app/core/dungeon-ui/services/ui-interaction/ui-interaction.service";
import { EffectControllerService } from "../effect-controller/effect-controller.service";
import { CastEffectUiActivity, ClaimTreasureUiActivity, LeaveDungeonUiActivity, FinishTurnUiActivity, InteractCharacterUiActivity } from "src/app/core/dungeon-ui/services/ui-interaction/ui-activity";
import { DungeonInteractionStore } from "../../stores/dungeon-interaction.store";
import { finishTurn } from '@game-logic/lib/activities/player-activities/finish-turn.directive';
import { leaveDungeon } from "@game-logic/lib/activities/player-activities/leave-dungeon.directive";
import { IDungeonViewModel } from "../../interfaces/view-model.interface";


@Injectable()
export class PlayerTurnControllerService {
  
  constructor(
    private readonly _dungeonStateStore: DungeonStateStore,
    private readonly _dungeonInteractionStore: DungeonInteractionStore,
    private readonly _sceneInteractionService: SceneInteractionService,
    private readonly _uiInteractionService: UiInteractionService,
    private readonly _effectControllerService: EffectControllerService,
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
        await this._effectControllerService.castEffect(activity.data);
      } else if (activity instanceof ClaimTreasureUiActivity) {
        
      } else if (activity instanceof InteractCharacterUiActivity) {
        
      } else if (activity instanceof FinishTurnUiActivity) {
        this._dungeonStateStore.dispatchActivity(finishTurn());
      } else if (activity instanceof LeaveDungeonUiActivity) {
        const isLeaving = await this._uiInteractionService.requireMakeLeaveDungeonDecision();
        if (isLeaving) {
          this._dungeonStateStore.dispatchActivity(finishTurn());
          this._dungeonStateStore.dispatchActivity(leaveDungeon({ exit: activity.data }))
        }
      } 

      console.log(this._dungeonStateStore.currentState.isTurnFinished)

      this._dungeonInteractionStore.updateState({
        selectedActivityId: undefined,
        payloadDefinitions: [],
        collectedData: []
      });
    }
  }

  private _listenForActorInteraction(): Observable<string> {
    const possibleActorInteractionIds = Object.values(this._dungeonStateStore.currentState.board.objects)
      .filter(a => validatePossibilityToInteractActor(this._dungeonStateStore.currentState, { actorId: a.id }))
      .map(i => i.id);
    return this._sceneInteractionService.listenForInteractionsWithActors(possibleActorInteractionIds)
      .pipe(map(to => to.auxId))
  }
 
}