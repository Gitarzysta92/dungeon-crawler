import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameBuilderStateStore } from '../../stores/game-builder-state.store';
import { Subject, takeUntil } from 'rxjs';
import { IHeroRaceDeclaration } from '@game-logic/gameplay/modules/heroes/entities/hero-race/hero-race.interface';
import { INarrationMedium } from 'src/app/core/game-ui/entities/narrative-medium/narrative-medium.interface';
import { IVisualMedium } from 'src/app/core/game-ui/entities/visual-medium/visual-medium.interface';
import { PickerStep } from '../../state/game-builder.state';

@Component({
  selector: 'race-picker',
  templateUrl: './race-picker.component.html',
  styleUrls: ['./race-picker.component.scss']
})
export class RacePickerComponent implements OnInit, OnDestroy {

  public races: Array<IHeroRaceDeclaration & INarrationMedium & IVisualMedium>;
  public selectedRace: IHeroRaceDeclaration & INarrationMedium & IVisualMedium;
  public step: PickerStep;

  private readonly _stepIndex = 0;
  private readonly _destroyed = new Subject<void>();

  constructor(
    private readonly _gameBuilderStateStore: GameBuilderStateStore
  ) { }

  ngOnInit(): void {
    this._gameBuilderStateStore.state$
      .pipe(takeUntil(this._destroyed))
      .subscribe(d => {
        this.step = d.steps[this._stepIndex] as PickerStep;
        this.races = this.step.items as unknown as Array<IHeroRaceDeclaration & INarrationMedium & IVisualMedium>;
        this.selectedRace = this.step.selectedItem as unknown as IHeroRaceDeclaration & INarrationMedium & IVisualMedium
      });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }

  public select(item: IHeroRaceDeclaration & INarrationMedium & IVisualMedium): void {
    this._gameBuilderStateStore.updateStep(this.step, item)
  }
}