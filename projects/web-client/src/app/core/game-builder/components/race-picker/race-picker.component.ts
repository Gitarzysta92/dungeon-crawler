import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { GameBuilderStateStore } from '../../stores/game-builder-state.store';
import { BehaviorSubject, Subject, map, takeUntil } from 'rxjs';
import { IHeroRaceDeclaration } from '@game-logic/gameplay/modules/heroes/entities/hero-race/hero-race.interface';
import { INarrationMedium } from 'src/app/core/game-ui/entities/narrative-medium/narrative-medium.interface';
import { IVisualMedium } from 'src/app/core/game-ui/entities/visual-medium/visual-medium.interface';
import { PickerStep } from '../../state/game-builder.state';
import { IBuilderStepComponent } from '../../interfaces/builder-step-component.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'race-picker',
  templateUrl: './race-picker.component.html',
  styleUrls: ['./race-picker.component.scss'],
})
export class RacePickerComponent implements OnInit, OnDestroy, IBuilderStepComponent {

  @Output() canBeResolved$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public races: Array<IHeroRaceDeclaration & INarrationMedium & IVisualMedium>;
  public selectedRace: IHeroRaceDeclaration & INarrationMedium & IVisualMedium;
  public previewRace: IHeroRaceDeclaration & INarrationMedium & IVisualMedium;
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
        this.races = this.step.items as unknown as Array<IHeroRaceDeclaration & INarrationMedium & IVisualMedium>;
        this.previewRace = this.step.selectedItem as any ?? this.races[0];
        this.selectedRace = this.step.selectedItem as unknown as IHeroRaceDeclaration & INarrationMedium & IVisualMedium;
        if (this.selectedRace) {
          this.canBeResolved$.next(true);
        }
      });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }

  public preview(item: IHeroRaceDeclaration & INarrationMedium & IVisualMedium): void {
    this.previewRace = item;
    if (this.previewRace) {
      this.canBeResolved$.next(true);
    }
  }

  public async resolve(): Promise<void> {
    if (!this.canBeResolved$.value) {
      throw new Error();  
    }
    return this._gameBuilderStateStore.updateStep(this.step, this.previewRace);
  }

}