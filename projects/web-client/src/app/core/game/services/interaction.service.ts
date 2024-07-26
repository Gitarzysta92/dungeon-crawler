import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, catchError, first, of, take, takeUntil } from "rxjs";
import { IInteractionResult } from "../interfaces/interaction.interface";
import { SceneInteractionService } from "../../scene/api";
import { UiInteractionService } from "../../game-ui/services/ui-interaction.service";
import { IInteractableMedium } from "../../game-ui/mixins/interactable-medium/interactable-medium.interface";

@Injectable()
export class InteractionService {

  public get currentProcess() { return this.process$.value };
  public process$: BehaviorSubject<InteractionProcess<unknown> | null> = new BehaviorSubject(null);
  private _autoResolve: boolean = false;

  constructor(
    private readonly _sceneInteractionService: SceneInteractionService,
    private readonly _uiInteractionService: UiInteractionService
  ) {}

  
  public allowHovering(
    allowedMediums: Map<IInteractableMedium, IInteractableMedium>
  ): () => void {
    this._sceneInteractionService.allowHovering(cb => allowedMediums.has(cb as unknown as IInteractableMedium));
    return () => this._sceneInteractionService.settleHovering();
  }


  public highlightElements(mediums: IInteractableMedium[]): () => void {
    mediums = [...mediums];
    mediums.forEach(m => m.isHighlighted = true);
    return () => mediums.forEach(m => m.isHighlighted = false);
  }


  public selectElements(mediums: IInteractableMedium[]): () => void {
    mediums = [...mediums];
    mediums.forEach(m => m.isSelected = true);
    return () => mediums.forEach(m => m.isSelected = false);
  }


  public disableElements(mediums: IInteractableMedium[]): () => void { 
    mediums = [...mediums];
    mediums.forEach(m => m.isDisabled = true);
    return () => mediums.forEach(m => m.isDisabled = false);
  }

  public requestInteraction<T>(
    dataProvider: Observable<T>,
    autoResolve?: boolean
  ): Observable<IInteractionResult<T>> {
    if (this.currentProcess) {
      throw new Error("Cannot request new interaction while previous is not finished")
    }
    autoResolve = autoResolve ?? this._autoResolve;
    const process = new InteractionProcess<T>(dataProvider, autoResolve);
    this.process$.next(process);
    process.onFinalize.subscribe(() => this.process$.next(null));
    return process.interaction$
  }
}


export class InteractionProcess<T> {
  public canBeConfirmed: boolean = false;
  public canBeCanceled: boolean = true;
  public interaction$: Observable<IInteractionResult<T>>;
  public get onFinalize() { return this._finalize.pipe(first()) }

  private _confirmation: Subject<void> = new Subject();
  private _cancelation: Subject<void> = new Subject();

  private _finalize: Subject<void> = new Subject();

  constructor(
    _dataProvider: Observable<T>,
    _autoResolve: boolean,
  ) {
    this.interaction$ = this._initialize(_dataProvider, _autoResolve);
  }

  public confirm(): void {
    if (!this.canBeConfirmed) {
      throw new Error("Interaction process cannot be confirmed")  
    }
    this._confirmation.next();
    this.finalize()
  }

  public cancel(): void {
    if (!this.canBeCanceled) {
      throw new Error("Interaction process cannot be canceled")  
    }
    this._cancelation.next();
    this.finalize();
  }

  public finalize(): void {
    this._finalize.next();
  }

  private _initialize(
    dataProvider: Observable<T>,
    autoResolve?: boolean
  ) {
    return new Observable<IInteractionResult<T>>(s => {
      const result: IInteractionResult<T> = { isSuccessful: null, data: null, isCompleted: false }
      const source = autoResolve ? dataProvider.pipe(take(1)) : dataProvider
      source
        .pipe(takeUntil(this._finalize))
        .subscribe({
          next: d => {
            result.isSuccessful = true;
            result.data = d;
            this.canBeConfirmed = true;
            if (autoResolve) {
              result.isCompleted = true;
              s.next(result);
              s.complete();
              this._finalize.next();
            } else {
              s.next(result);
            }
          },
          error: e => {
            result.isSuccessful = false;
            result.isCompleted = true;
            console.warn(e);
            s.next(result);
            s.complete();
            this._finalize.next();
          }
        });  
      this._confirmation
        .pipe(takeUntil(this._finalize))
        .subscribe(() => {
          result.isSuccessful = true;
          result.isCompleted = true;
          s.next(result);
          s.complete();
          this._finalize.next();
        });
      this._cancelation
        .pipe(takeUntil(this._finalize))
        .subscribe(() => {
          result.isSuccessful = false;
          result.isCompleted = true;
          s.next(result);
          s.complete();
          this._finalize.next();
        });
    }).pipe(catchError(e => {
      console.warn(e);
      return of({ isSuccessful: false, data: null, isCompleted: true })
    }))
  }
}