import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subject, map, takeUntil } from 'rxjs';
import { GameBuilderStateStore } from '../../stores/game-builder-state.store';
import { FormStep } from '../../state/game-builder.state';
import { IBuilderStepComponent } from '../../interfaces/builder-step-component.interface';
import { ActivatedRoute } from '@angular/router';
import { IPlainAssetDefinition } from 'src/app/infrastructure/asset-loader/api';

@Component({
  selector: 'identity-picker',
  templateUrl: './identity-picker.component.html',
  styleUrls: ['./identity-picker.component.scss']
})
export class IdentityPickerComponent implements OnInit, OnDestroy, IBuilderStepComponent {

  @Output() canBeResolved$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public data: { name: string, avatarUrl: string } = { name: null, avatarUrl: "hero/avatar.png" };
  public step: FormStep<{ name: string, avatarUrl: string }>;

  public playerAvatar: IPlainAssetDefinition;

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
        this.step = s as FormStep<{ name: string, avatarUrl: string }>;
        this.data = this.step.data;
        this.playerAvatar = { url: this.data.avatarUrl };
        if (Object.values(this.data).every(d => !!d)) {
          this.canBeResolved$.next(true);
        }
      });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }

  public onNameChange(name): void {
    this.canBeResolved$.next(name.length > 0) 
  }

  public resolve(): Promise<void> {
    if (!this.canBeResolved$.value) {
      throw new Error();  
    }
    return this._gameBuilderStateStore.updateStep(this.step, this.data)
  }
}

