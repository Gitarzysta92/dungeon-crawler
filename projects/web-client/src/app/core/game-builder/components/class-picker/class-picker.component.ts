import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { GameBuilderStateStore } from '../../stores/game-builder-state.store';
import { IHeroClassDeclaration } from '@game-logic/gameplay/modules/heroes/mixins/hero-class/hero-class.interface';
import { BehaviorSubject, Subject, map, takeUntil } from 'rxjs';
import { INarrationMedium } from 'src/app/core/game-ui/entities/narrative-medium/narrative-medium.interface';
import { IVisualMedium } from 'src/app/core/game-ui/entities/visual-medium/visual-medium.interface';
import { PickerStep } from '../../state/game-builder.state';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'class-picker',
  templateUrl: './class-picker.component.html',
  styleUrls: ['./class-picker.component.scss']
})
export class ClassPickerComponent implements OnInit, OnDestroy {

  @Output() canBeResolved$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public classes: Array<IHeroClassDeclaration & INarrationMedium & IVisualMedium>;
  public selectedClass: IHeroClassDeclaration & INarrationMedium & IVisualMedium;
  public previewClass: IHeroClassDeclaration & INarrationMedium & IVisualMedium;
  public step: PickerStep;

  private readonly _destroyed = new Subject<void>();

  constructor(
    private readonly _gameBuilderStateStore: GameBuilderStateStore,
    private readonly _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._gameBuilderStateStore.state$
      .pipe(
        map(p => p.getStep(this._activatedRoute.snapshot.queryParams.stepId)),
        takeUntil(this._destroyed)
      )
      .subscribe(s => {
        this.step = s as PickerStep;
        this.classes = this.step.items as unknown as Array<IHeroClassDeclaration & INarrationMedium & IVisualMedium>;
        this.previewClass = this.step.selectedItem as any ?? this.classes[0];
        this.selectedClass = this.step.selectedItem as unknown as IHeroClassDeclaration & INarrationMedium & IVisualMedium;
        if (this.selectedClass) {
          this.canBeResolved$.next(true);
        }
      });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }

  public preview(item: IHeroClassDeclaration & INarrationMedium & IVisualMedium): void {
    this.previewClass = item;
    if (this.previewClass) {
      this.canBeResolved$.next(true);
    }
  }

  public async resolve(): Promise<void> {
    if (!this.canBeResolved$.value) {
      throw new Error();  
    }
    return this._gameBuilderStateStore.updateStep(this.step, this.previewClass);
  }
}
