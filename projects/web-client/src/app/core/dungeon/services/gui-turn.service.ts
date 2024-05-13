import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { DungeonStateStore } from "src/app/core/dungeon/stores/dungeon-state.store";
import { UiInteractionService } from "../../game-ui/services/ui-interaction.service";


@Injectable()
export class GuiTurnService {
  
  constructor(
    private readonly _dungeonStateStore: DungeonStateStore,
    private readonly _uiInteractionService: UiInteractionService
  ) { }

  
  public waitForActivity(): (a: unknown) => Promise<void> {
    // return firstValueFrom(this._dungeonStateStore.state$
    //   .pipe(
    //     filter(s => !!s.selectedActivity),
    //     map(s => s.selectedActivity)
    //   ))
    return async () => null
  }


  public isAnyActivityAvailable(): boolean {
    throw new Error("Method not implemented.");
  }



  public async handleTurn() {
    // while (isPlayerTurn) {
    //   const activity = await firstValueFrom(race(
    //     this._uiInteractionService.onActivitySelect,
    //     this._listenForActorInteraction()
    //       .pipe(switchMap(id => this._dungeonUiStore.state$.pipe(map(s => s.activities.find(a => a.id === id)))))
    //   ));
        
    //   if (!activity) {
    //     throw new Error('Cannot find activity');
    //   }

    //   this._dungeonInteractionStore.updateState({ selectedActivityId: activity.id });

    //   if (activity instanceof CastEffectUiActivity) {
    //     await this._castEffect(activity.getCopy().data);
    //   } else if (activity instanceof ClaimTreasureUiActivity) {
        
    //   } else if (activity instanceof InteractCharacterUiActivity) {
        
    //   } else if (activity instanceof FinishTurnUiActivity) {
    //     this._finishTurn();
    //   } else if (activity instanceof LeaveDungeonUiActivity) {
    //     await this._leaveDungeon(activity);
    //   } 

    //   isPlayerTurn = this._dungeonStateStore.currentState.isPlayerTurn();
    //   await this._dungeonSceneStore.updateState(this._dungeonStateStore.store, this._dungeonInteractionStore.store)
    //   this._emitEmptyStateOfPayloadCollector();
    // }
  }



  private async _leaveDungeon(activity: any): Promise<void> {
    // const isLeaving = await this._uiInteractionService.requireMakeLeaveDungeonDecision();
    // if (isLeaving) {
    //   await this._dungeonStateStore.dispatch(finishTurn());
    //   await this._dungeonStateStore.dispatch(leaveDungeon({ exit: activity.data }))
    // }
  }

  private _listenForActorInteraction(): Observable<string> {
    // const possibleActorInteractionIds = Object.values(this._dungeonStateStore.currentState.board.objects)
    //   .filter(a => validatePossibilityToInteractActor(this._dungeonStateStore.currentState, { actorId: a.id }))
    //   .map(i => i.id);
    // return this._sceneInteractionService.listenForInteractionsWithActors(possibleActorInteractionIds)
    //   .pipe(map(to => to.auxId))
    return of("")
  }
 
}