import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { GameBuilderStateStore } from '../../stores/game-builder-state.store';
import { Subject, distinctUntilChanged,filter,map,pairwise,takeUntil, tap } from 'rxjs';
import { GameBuilderState } from '../../state/game-builder.state';
import { ActivatedRoute } from '@angular/router';
import IBuilderStep from '../../interfaces/builder-step.interface';
import { GameBuilderService } from '../../services/game-builder.service';
import { GamePersistenceService } from 'src/app/core/game-persistence/services/game-persistence.service';
import { GameSaveProvider } from 'src/app/core/adventure/misc/game-save-provider';
import { IBuilderStepComponent } from '../../interfaces/builder-step-component.interface';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'game-builder',
  templateUrl: './game-builder-view.component.html',
  styleUrls: ['./game-builder-view.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ transform: "translate(-200px, 0)" }),
        animate('0.2s ease-out', style({ transform: "translate(0, 0)" }))
      ])
    ])
  ]
})
export class GameBuilderViewComponent implements OnInit, OnDestroy {

  public currentStepComponent: IBuilderStepComponent;
  public process: GameBuilderState;
  private _destroyed: Subject<void> = new Subject();

  constructor(
    private readonly _routingService: RoutingService,
    private readonly _gameBuilderStateStore: GameBuilderStateStore,
    private readonly _gameBuilderService: GameBuilderService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _gamePersistanceService: GamePersistenceService
  ) { }

  ngOnInit(): void {
    //TO DO; Refactor state to be driven by url
    this._routingService.onNavigationStart.
      pipe(
        pairwise(),
        map(([p, c]) => ({
          p: this.process.steps.find(s => (p.event.url.split('/').reverse()[0]).includes(s.stepName)),
          c: this.process.steps.find(s => (c.event.url.split('/').reverse()[0]).includes(s.stepName))
        })),
        filter(({ p, c }) => !!p && !!c),
        takeUntil(this._destroyed)
      )
      .subscribe(({ p, c }) => {
        p.isSelected = false;
        c.isSelected = true;
      })

    this._gameBuilderStateStore.state$
      .pipe(
        distinctUntilChanged((p, c) => p.currentStepId !== c.currentStepId),
        takeUntil(this._destroyed)
      )
      .subscribe(s => {
        this._routingService.navWithExtras(
          [s.currentStep.stepName],
          this._activatedRoute,
          { queryParams: { stepId: s.currentStepId } }
        );
        this.process = s;
      })
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }

  public returnToMenu() {
    this._routingService.navigateToMainMenu();
  }

  public navigateToStep(step: IBuilderStep) {
    if (this.process.nextStep === step && !this.process.currentStep.isFulfilled) {
      throw new Error("Cannot move to next step, when current is not fulfilled");
    } 
    this._gameBuilderStateStore.selectStep(step);
  }

  public async navigateToNextStep(): Promise<void> {
    if (this.process.isFinished) {
      const game = await this._gameBuilderService.createGame(this.process);
      await this._gamePersistanceService.makeNewGameSave(new GameSaveProvider(game), [game], null, true);
      this._routingService.navigateToGame()
    } else {
      this.currentStepComponent.resolve();
      if (this.process.nextStep) {
        this._gameBuilderStateStore.selectStep(this.process.nextStep);
      }
    }
  }

  public isPreviousStepNotFulfilled(step?: IBuilderStep): boolean {
    const index = this.process.steps.indexOf(step) - 1
    if (index < 0) {
      return false;
    }
    return !this.process.steps[this.process.steps.indexOf(step) - 1]?.isFulfilled
  }

  public onActivate(c: IBuilderStepComponent): void {
    this.currentStepComponent = c;
  }
}