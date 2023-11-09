import { Injectable } from '@angular/core';
import { IEffect } from '@game-logic/lib/features/effects/effect-commons.interface';
import { filter, firstValueFrom, map, Observable, pairwise, Subject, takeUntil, tap } from 'rxjs';
import { IActivityConfirmationResult } from '../../interfaces/activity-confirmation-result';
import { DungeonUiStore } from '../../stores/dungeon-ui.store';
import { IDungeonUiActivity } from '../../interfaces/dungeon-ui-activity';
import { ModalService } from 'src/app/shared/dialogs/api';
import { DungeonExitModalComponent } from '../../components/dungeon-exit-modal/dungeon-exit-modal.component';



@Injectable()
export class UiInteractionService {

  public onActivitySelect: Subject<IDungeonUiActivity> = new Subject()

  constructor(
    private readonly _dungeonUiStore: DungeonUiStore,
    private readonly _modalService: ModalService
  ) { }
  

  public async requireMakeLeaveDungeonDecision(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._modalService.open(DungeonExitModalComponent, {
        accept: () => resolve(true),
        reject: () => resolve(false)
      });
    })
  }

  public selectActivity(activity: IDungeonUiActivity): void {
    this.onActivitySelect.next(activity);
  }


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

  public requireSelectActivity(): Promise<IEffect> {
    return new Promise<IEffect>(async (resolve, reject) => {
      this._dungeonUiStore.updateState({ activitySelectionRequired: true });
      resolve(await firstValueFrom(this._dungeonUiStore.state
        .pipe(map(s => s.activities.find(a => a.isSelected)))) as unknown as IEffect);
    });
  }
}
