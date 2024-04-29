import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GameBuilderStateStore } from '../../stores/game-builder-state.store';
import { FormStep } from '../../state/game-builder.state';

@Component({
  selector: 'identity-picker',
  templateUrl: './identity-picker.component.html',
  styleUrls: ['./identity-picker.component.scss']
})
export class IdentityPickerComponent implements OnInit, OnDestroy {

  public data: { [key: string]: unknown; } = {};
  public step: FormStep;

  private readonly _stepIndex = 3;
  private readonly _destroyed = new Subject<void>();

  constructor(
    private readonly _gameBuilderStateStore: GameBuilderStateStore
  ) { }

  ngOnInit(): void {
    this._gameBuilderStateStore.state$
      .pipe(takeUntil(this._destroyed))
      .subscribe(d => {
        this.step = d.steps[this._stepIndex] as FormStep;
        this.data = this.step.data
      });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }

  public select(item: any): void {
    this._gameBuilderStateStore.updateStep(this.step, item)
  }
}

