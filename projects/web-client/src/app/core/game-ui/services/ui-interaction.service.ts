import { Injectable } from '@angular/core';
import { firstValueFrom, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { IActivityConfirmationResult } from '../interfaces/activity-confirmation-result';
import { DungeonUiStore } from '../stores/dungeon-ui.store';
import { ModalService } from 'src/app/shared/dialogs/api';
import { DungeonExitModalComponent } from '../components/dungeon-exit-modal/dungeon-exit-modal.component';
import { DungeonCardAcknowledgementModalComponent } from '../components/dungeon-card-acknowledgement-modal/dungeon-card-acknowledgement-modal.component';


@Injectable()
export class UiInteractionService {
  
  //public onActivitySelect: Subject<IDungeonUiActivity> = new Subject()

  constructor(
    private readonly _dungeonUiStore: DungeonUiStore,
    private readonly _modalService: ModalService
  ) { }
  

  // public async requireDungeonCardAcknowledgement(card: IDungeonCard<IEffect>, params: IEffectPayload): Promise<void> {
  //   return new Promise((resolve) => {
  //     this._modalService.open(DungeonCardAcknowledgementModalComponent, {
  //       card,
  //       acknowledge: () => resolve(),
  //     });
  //   })
  // }


  // public async requireMakeLeaveDungeonDecision(): Promise<boolean> {
  //   return new Promise((resolve) => {
  //     this._modalService.open(DungeonExitModalComponent, {
  //       accept: () => resolve(true),
  //       reject: () => resolve(false)
  //     });
  //   })
  // }


  // public selectActivity(activity: IDungeonUiActivity): void {
  //   this.onActivitySelect.next(activity);
  // }


  // public confirmActivity() {
  //   this._dungeonUiStore.updateState({
  //     activityConfirmationRequired: false,
  //     activityIdToConfirmation: undefined,
  //     activityConfirmed: true,
  //   });
  // }


  // public abandonActivity() {
  //   this._dungeonUiStore.updateState({
  //     activityConfirmationRequired: false,
  //     activityIdToConfirmation: undefined,
  //     activityConfirmed: false,
  //   });
  // }


  // public requireActivityConfirmationOrAbandon(id: string, provider: Observable<unknown>): Promise<IActivityConfirmationResult> {
  //   return new Promise<IActivityConfirmationResult>(async (resolve, reject) => {
  //     const { activityIdToConfirmation: activityIdToConfirm } = this._dungeonUiStore.currentState;
  //     if (!!activityIdToConfirm && activityIdToConfirm !== id) {
  //       reject()
  //     }
  //     this._dungeonUiStore.updateState({
  //       activityConfirmationRequired: true,
  //       activityIdToConfirmation: id,
  //       activityConfirmed: undefined,
  //       confirmationPossible: false,
  //     });

  //     let value;
  //     const confirmation = new Subject<void>();
      
  //     provider
  //       .pipe(
  //         tap(v => this._dungeonUiStore.updateState({ confirmationPossible: v !== null || v !== undefined })),
  //         takeUntil(confirmation)
  //       )
  //       .subscribe(v => value = v);

  //     const decision = await firstValueFrom(this._listenForActivityConfirmation(id));

  //     confirmation.next();
  //     resolve({
  //       activityId: id,
  //       confirmed: decision,
  //       data: value
  //     });
  //   });
  // }


  // public requireSelectActivity(): Promise<IEffect> {
  //   return new Promise<IEffect>(async (resolve, reject) => {
  //     this._dungeonUiStore.updateState({ activitySelectionRequired: true });
  //     resolve(await firstValueFrom(this._dungeonUiStore.state$
  //       .pipe(map(s => s.activities.find(a => a.isSelected)))) as unknown as IEffect);
  //   });
  // }

}
