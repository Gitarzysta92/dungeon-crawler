import { Injectable } from "@angular/core";
import { validatePossibilityToInteractActor } from "@game-logic/lib/activities/player-activities/make-actor-interaction.directive";
import { Observable, firstValueFrom, map, race } from "rxjs";
import { DungeonStateStore } from "src/app/core/dungeon-logic/stores/dungeon-state.store";
import { SceneInteractionService } from "src/app/core/dungeon-scene/api";
import { IDungeonUiActivity } from "src/app/core/dungeon-ui/interfaces/dungeon-ui-activity";
import { UiInteractionService } from "src/app/core/dungeon-ui/services/ui-interaction/ui-interaction.service";
import { EffectControllerService } from "../effect-controller/effect-controller.service";
import { CastEffectUiActivity, ClaimTreasureUiActivity, ExitDungeonUiActivity, FinishTurnUiActivity, InteractCharacterUiActivity } from "src/app/core/dungeon-ui/services/ui-interaction/ui-activity";
import { DungeonInteractionStore } from "../../stores/dungeon-interaction.store";
import { finishTurn } from '@game-logic/lib/activities/player-activities/finish-turn.directive';


@Injectable()
export class PlayerTurnControllerService {
  
  constructor(
    private readonly _dungeonStateStore: DungeonStateStore,
    private readonly _dungeonInteractionStore: DungeonInteractionStore,
    private readonly _sceneInteractionService: SceneInteractionService,
    private readonly _uiInteractionService: UiInteractionService,
    private readonly _effectControllerService: EffectControllerService,
  ) { }

  public async handlePlayerTurn() {
    while (!this._dungeonStateStore.currentState.isTurnFinished) {
      const activity = await firstValueFrom(race(
          this._uiInteractionService.onActivitySelect,
          this._listenForActorInteraction()
      ));
        
      if (!activity) {
        throw new Error('');
      }

      this._dungeonInteractionStore.updateState({ selectedActivityId: activity.id });

      if (activity instanceof CastEffectUiActivity) {
        this._effectControllerService.castEffect(activity.data);
      } else if (activity instanceof ClaimTreasureUiActivity) {
        
      } else if (activity instanceof InteractCharacterUiActivity) {
        
      } else if (activity instanceof FinishTurnUiActivity) {
        this._dungeonStateStore.dispatchActivity(finishTurn());
      } else if (activity instanceof ExitDungeonUiActivity) {
        
      }

      this._dungeonInteractionStore.updateState({
        selectedActivityId: undefined,
        payloadDefinitions: [],
        collectedData: []
      });
    }
  }

  private _listenForActorInteraction(): Observable<IDungeonUiActivity> {
    const possibleActorInteractionIds = Object.values(this._dungeonStateStore.currentState.board.objects)
      .filter(a => validatePossibilityToInteractActor(this._dungeonStateStore.currentState, { actorId: a.id }))
      .map(i => i.id);
    return this._sceneInteractionService.listenForInteractionsWithActors(possibleActorInteractionIds)
      .pipe(map(to => to.auxId)) as any
  }
 
}