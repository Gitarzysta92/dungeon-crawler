import { Injectable } from '@angular/core';
import { IEffect } from '@game-logic/lib/features/effects/effect-commons.interface';
import { filter, firstValueFrom, map, Observable, pairwise, Subject, takeUntil, tap } from 'rxjs';
import { IActivityConfirmationResult } from '../../interfaces/activity-confirmation-result';
import { DungeonUiStore } from '../../stores/dungeon-ui.store';


@Injectable()
export class UiInteractionService {

  constructor(
    private readonly _dungeonUiStore: DungeonUiStore
  ) {}

  public confirmActivity() {
    this._dungeonUiStore.updateState({
      activityConfirmationRequired: false,
      activityIdToConfirm: undefined,
      activityConfirmed: true,
    });
  }

  public abandonActivity() {
    this._dungeonUiStore.updateState({
      activityConfirmationRequired: false,
      activityIdToConfirm: undefined,
      activityConfirmed: false,
    });
  }

  public requireActivityConfirmationOrAbandon(id: string, provider: Observable<unknown>): Promise<IActivityConfirmationResult> {
    return new Promise<IActivityConfirmationResult>(async (resolve, reject) => {
      const { activityIdToConfirm } = this._dungeonUiStore.currentState;
      if (!!activityIdToConfirm && activityIdToConfirm !== id) {
        reject()
      }
      this._dungeonUiStore.updateState({
        activityConfirmationRequired: true,
        activityIdToConfirm: id,
        activityConfirmed: undefined,
        confirmationPossible: false,
      });

      let value;
      const confirmation = new Subject<void>();
      
      provider
        .pipe(
          tap(v => this._dungeonUiStore.updateState({ confirmationPossible: !!v })),
          takeUntil(confirmation)
        )
        .subscribe(v => value = v);

      const decision = await firstValueFrom(this._dungeonUiStore.state
        .pipe(
          pairwise(),
          filter(s => s[0].activityIdToConfirm === id &&
            s[0].activityConfirmationRequired === true &&
            s[1].activityConfirmationRequired === false),
          map(s => s[1].activityConfirmed)
        ));

      confirmation.next();
      resolve({
        activityId: id,
        confirmed: decision,
        data: value
      });
    });
  }

  public highlightEffects(effects: IEffect[]): void {
    this._dungeonUiStore.updateState({
      activities:
        this._dungeonUiStore.currentState.activities.map(a => Object.assign({...a}, {
          isHighlighted: effects.some(e => e.id === a.id)
        }))
    })
  }

  public selectActivity(effect: IEffect): void {
    this._dungeonUiStore.updateState({
      activities:
        this._dungeonUiStore.currentState.activities.map(a => Object.assign(a, {
          isSelected: effect.id === a.id 
        }))
    })
  }

  public requireSelectActivity(): Promise<IEffect> {
    return new Promise<IEffect>(async (resolve, reject) => {
      this._dungeonUiStore.updateState({ activitySelectionRequired: true });
      resolve(await firstValueFrom(this._dungeonUiStore.state
        .pipe(map(s => s.activities.find(a => a.isSelected)))) as unknown as IEffect);
    });
  }
}
