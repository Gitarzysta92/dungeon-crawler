import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subject, map, takeUntil } from 'rxjs';
import { INarrationMedium } from 'src/app/core/game-ui/entities/narrative-medium/narrative-medium.interface';
import { IVisualMedium } from 'src/app/core/game-ui/entities/visual-medium/visual-medium.interface';
import { PickerStep } from '../../state/game-builder.state';
import { GameBuilderStateStore } from '../../stores/game-builder-state.store';
import { IHeroOriginDeclaration } from '@game-logic/gameplay/modules/heroes/entities/hero-origin/hero-origin.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'origin-picker',
  templateUrl: './origin-picker.component.html',
  styleUrls: ['./origin-picker.component.scss']
})
export class OriginPickerComponent implements OnInit, OnDestroy {

  @Output() canBeResolved$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public origins: Array<IHeroOriginDeclaration & INarrationMedium & IVisualMedium>;
  public selectedOrigin: IHeroOriginDeclaration & INarrationMedium & IVisualMedium;
  public previewOrigin: IHeroOriginDeclaration & INarrationMedium & IVisualMedium;
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
        this.origins = this.step.items as unknown as Array<IHeroOriginDeclaration & INarrationMedium & IVisualMedium>;
        this.previewOrigin = this.step.selectedItem as any ?? this.origins[0];
        this.selectedOrigin = this.step.selectedItem as unknown as IHeroOriginDeclaration & INarrationMedium & IVisualMedium;
        if (this.selectedOrigin) {
          this.canBeResolved$.next(true);
        }
      });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }

  public preview(item: IHeroOriginDeclaration & INarrationMedium & IVisualMedium): void {
    this.previewOrigin = item;
    if (this.previewOrigin) {
      this.canBeResolved$.next(true);
    }
  }

  public async resolve(): Promise<void> {
    if (!this.canBeResolved$.value) {
      throw new Error();  
    }
    return this._gameBuilderStateStore.updateStep(this.step, this.previewOrigin);
  }

}