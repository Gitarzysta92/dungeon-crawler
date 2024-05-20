import { Injectable } from '@angular/core';
import { SceneService } from '../../scene/services/scene.service';
import { Observable, filter, firstValueFrom, race } from 'rxjs';
import { UiService } from './ui.service';
import { IActivity } from '@game-logic/lib/base/activity/activity.interface';
import { ISceneMedium } from '../../scene/mixins/scene-medium/scene-medium.interface';
import { IUiMedium } from '../mixins/visual-medium/ui-medium.interface';


@Injectable()
export class InteractionService {
  
  constructor(
    private readonly _sceneService: SceneService,
    private readonly _uiService: UiService
  ) { }

  public async requestActivitySelection(allowedActivities: Array<IActivity & ISceneMedium & IUiMedium & { subject: ISceneMedium }>) {
    allowedActivities.forEach(a => {
      a.isHighlighted = true;
      a.subject.isHighlighted = true
    });
    const selection = race([
      this._sceneService.listenForSelections<IActivity>(),
      this._uiService.listenForSelections<IActivity>()
    ]).pipe(filter(s => s.isActivity && allowedActivities.some(a => a.id === s.id)))

    const result = await firstValueFrom(selection);
    allowedActivities.forEach(a => {
      a.isHighlighted = true;
      a.subject.isHighlighted = false
    });
    return result;
  }


  public async requestAcknowledgement(modalComponent) {
    // return new Promise((resolve) => {
    //   this._modalService.open(modalComponent, {
    //     accept: () => resolve(true),
    //     reject: () => resolve(false)
    //   });
    // })
  }


  public requestConfirmation() {
    // this._dungeonUiStore.updateState({
    //   activityConfirmationRequired: false,
    //   activityIdToConfirmation: undefined,
    //   activityConfirmed: true,
    // });
  }


  public requestAbandon() {
    // this._dungeonUiStore.updateState({
    //   activityConfirmationRequired: false,
    //   activityIdToConfirmation: undefined,
    //   activityConfirmed: false,
    // });
  }
}







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
