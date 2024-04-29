import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameBuilderStateStore } from '../../stores/game-builder-state.store';
import { IHeroClassDeclaration } from '@game-logic/gameplay/modules/heroes/entities/hero-class/hero-class.interface';
import { Subject, takeUntil } from 'rxjs';
import { INarrationMedium } from 'src/app/core/game-ui/entities/narrative-medium/narrative-medium.interface';
import { IVisualMedium } from 'src/app/core/game-ui/entities/visual-medium/visual-medium.interface';
import { PickerStep } from '../../state/game-builder.state';

@Component({
  selector: 'class-picker',
  templateUrl: './class-picker.component.html',
  styleUrls: ['./class-picker.component.scss']
})
export class ClassPickerComponent implements OnInit, OnDestroy {

  public classes: Array<IHeroClassDeclaration & INarrationMedium & IVisualMedium>;
  public selectedClass: IHeroClassDeclaration & INarrationMedium & IVisualMedium;
  public step: PickerStep;

  private readonly _stepIndex = 1;
  private readonly _destroyed = new Subject<void>();

  constructor(
    private readonly _gameBuilderStateStore: GameBuilderStateStore
  ) { }

  ngOnInit(): void {
    this._gameBuilderStateStore.state$
      .pipe(takeUntil(this._destroyed))
      .subscribe(d => {
        this.step = d.steps[this._stepIndex] as PickerStep;
        this.classes = this.step.items as unknown as Array<IHeroClassDeclaration & INarrationMedium & IVisualMedium>;
        this.selectedClass = this.step.selectedItem as unknown as IHeroClassDeclaration & INarrationMedium & IVisualMedium;
      });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }

  public select(item: IHeroClassDeclaration & INarrationMedium & IVisualMedium): void {
    this._gameBuilderStateStore.updateStep(this.step, item)
  }
}
