import { Component, OnDestroy, OnInit } from '@angular/core';
import { IHeroOriginDeclaration } from '@game-logic/gameplay/modules/heroes/entities/hero-origin/hero-origin.interface';
import { Subject, takeUntil } from 'rxjs';
import { INarrationMedium } from 'src/app/core/game-ui/entities/narrative-medium/narrative-medium.interface';
import { IVisualMedium } from 'src/app/core/game-ui/entities/visual-medium/visual-medium.interface';
import { PickerStep } from '../../state/game-builder.state';
import { GameBuilderStateStore } from '../../stores/game-builder-state.store';

@Component({
  selector: 'origin-picker',
  templateUrl: './origin-picker.component.html',
  styleUrls: ['./origin-picker.component.scss']
})
export class OriginPickerComponent implements OnInit, OnDestroy {

  public origins: Array<IHeroOriginDeclaration & INarrationMedium & IVisualMedium>;
  public selectedOrigin: IHeroOriginDeclaration & INarrationMedium & IVisualMedium;
  public step: PickerStep;

  private readonly _stepIndex = 2;
  private readonly _destroyed = new Subject<void>();

  constructor(
    private readonly _gameBuilderStateStore: GameBuilderStateStore
  ) { }

  ngOnInit(): void {
    this._gameBuilderStateStore.state$
      .pipe(takeUntil(this._destroyed))
      .subscribe(d => {
        this.step = d.steps[this._stepIndex] as PickerStep;
        this.origins = this.step.items as unknown as Array<IHeroOriginDeclaration & INarrationMedium & IVisualMedium>;
        this.selectedOrigin = this.step.selectedItem as unknown as IHeroOriginDeclaration & INarrationMedium & IVisualMedium;
      });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }

  public select(item: IHeroOriginDeclaration & INarrationMedium & IVisualMedium): void {
    this._gameBuilderStateStore.updateStep(this.step, item)
  }
}
