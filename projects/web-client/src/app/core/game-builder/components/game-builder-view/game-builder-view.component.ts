import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { GameBuilderStateStore } from '../../stores/game-builder-state.store';
import { Subject, distinctUntilChanged,takeUntil } from 'rxjs';
import { GameBuilderState } from '../../state/game-builder.state';
import { ActivatedRoute } from '@angular/router';
import IBuilderStep from '../../interfaces/builder-step.interface';
import { GameBuilderService } from '../../services/game-builder.service';
import { GamePersistenceService } from 'src/app/core/game-persistence/services/game-persistence.service';
import { GameSaveProvider } from 'src/app/core/adventure/misc/game-save-provider';

@Component({
  selector: 'game-builder',
  templateUrl: './game-builder-view.component.html',
  styleUrls: ['./game-builder-view.component.scss'],
})
export class GameBuilderViewComponent implements OnInit, OnDestroy {
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
    this._gameBuilderStateStore.state$
      .pipe(
        distinctUntilChanged((p, c) => p.currentStepIndex !== c.currentStepIndex),
        takeUntil(this._destroyed)
      )
      .subscribe(s => {
        this._routingService.nav([s.currentStep.stepName], this._activatedRoute);
        this.process = s;
      })
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }

  public returnToMenu() {
    this._routingService.navigateToMainMenu();
  }

  public async navigateToNextStep(step?: IBuilderStep): Promise<void> {
    const nextStep = step ?? this._gameBuilderStateStore.currentState.steps.find(s => !s.isFulfilled);
    if (!nextStep && !this.process.isFinished) {
      return;
    }

    if (this.process.isFinished) {
      const game = await this._gameBuilderService.createGame(this.process);
      await this._gamePersistanceService.makeNewGameSave(new GameSaveProvider(game), [game]);
      this._routingService.navigateToGame()
    } else {
      this._gameBuilderStateStore.update({ currentStepIndex: this._gameBuilderStateStore.currentState.steps.indexOf(nextStep) })
    }
  }

  public isPreviousStepNotFulfilled(step?: IBuilderStep): boolean {
    const index = this.process.steps.indexOf(step) - 1
    if (index < 0) {
      return false;
    }
    return !this.process.steps[this.process.steps.indexOf(step) - 1]?.isFulfilled
  }
}