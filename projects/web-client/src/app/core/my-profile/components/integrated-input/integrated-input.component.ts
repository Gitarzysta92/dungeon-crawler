import { group, query, style, transition, trigger, useAnimation } from "@angular/animations";
import { Component, OnInit, ChangeDetectorRef, Optional, Self, Inject, ViewChild,EventEmitter, Input, Output, OnDestroy } from "@angular/core";
import { NG_VALIDATORS, Validator, NG_ASYNC_VALIDATORS, AsyncValidator, NgModel, FormControl } from "@angular/forms";
import { Observable, Subject } from "rxjs";
import { takeUntil, filter, delay } from "rxjs/operators";
import { slideInAnimation } from "src/app/shared/animations/animations/slide-in.animation";
import { slideOutAnimation } from "src/app/shared/animations/animations/slide-out.animation";
import { AttachedOverlayDirective } from "src/app/shared/dialogs/directives/attached-overlay/attached-overlay.directive";
import { State, StateController } from "src/app/utils/state-controller/state-controller";

const STATE_NAME = {
  initial: 'initial',
  focused: 'focused',
  invalid: 'invalid',
  submitted: 'submitted',
  success: 'success',
  failure: 'failure'
};

@Component({
  selector: 'integrated-input',
  templateUrl: './integrated-input.component.html',
  styleUrls: ['./integrated-input.component.scss'],
  animations: [
    trigger('slideIn', [
      transition('* <=> *', [
        group([
          query(':enter', [
            style({ position: 'absolute'}),
            useAnimation(slideInAnimation('fromTop'), { params: { duration: '200ms', delay: '200ms' } })
          ], { optional: true }), 
          query(':leave', [
            style({ position: 'absolute'}),
            useAnimation(slideOutAnimation('toBottom'), { params: { duration: '200ms', delay: '0ms' } }),
          ], { optional: true })   
        ]) 
      ])
    ])
  ]
})
export class IntegratedInputComponent implements OnInit, OnDestroy {

  @ViewChild('inputRef', { static: true }) _inputRef: NgModel;
  @ViewChild('tooltipOverlay', { static: true }) _tooltip: AttachedOverlayDirective;

  @Input() value: string = '';
  @Input() name: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Output() onChange: EventEmitter<string> = new EventEmitter();

  public state: Observable<State>;

  private _stateController: StateController<State>;
  private _onDestroy: Subject<void> = new Subject();
  private _control: FormControl;
  private _initialValue: any;

  constructor(
    private readonly _changeDetector: ChangeDetectorRef,
    @Optional() @Self() @Inject(NG_VALIDATORS) private readonly _validators: Validator | Validator[],
    @Optional() @Self() @Inject(NG_ASYNC_VALIDATORS) private readonly _asyncValidators: AsyncValidator | AsyncValidator[],
  ) { 
    this._stateController = new StateController(STATE_NAME.initial, {
      [STATE_NAME.initial]: new State({ nextStates: [STATE_NAME.focused] }),
      [STATE_NAME.focused]: new State({ isFocused: true, nextStates: [STATE_NAME.submitted, STATE_NAME.invalid] }),
      [STATE_NAME.invalid]: new State({ isFocused: true, validationError: true, nextStates: [STATE_NAME.focused, STATE_NAME.invalid] }),
      [STATE_NAME.submitted]: new State({ isFocused: true, validationError: false, submitted: true, nextStates: [STATE_NAME.success, STATE_NAME.failure] }),
      [STATE_NAME.success]: new State({ isFocused: true, submitted: true, submitSuccess: true, nextStates: [STATE_NAME.initial] }),
      [STATE_NAME.failure]: new State({ isFocused: true, submitted: true, submitSuccess: false, nextStates: [STATE_NAME.initial] })
    });

    this.state = (this._stateController.onChange as any)
      .pipe(takeUntil(this._onDestroy));

    this.state.pipe(filter(s => s.is(STATE_NAME.success) || s.is(STATE_NAME.failure)))
      .pipe(delay(1000))
      .subscribe(s => {
        if (s.is(STATE_NAME.failure))
          this._resetComponent();
        s.next();
      });
  }

  ngOnInit(): void {
    this._control = this._inputRef.control;
    this._listenForValidationStatus(this._control);
    this._toggleTooltipOnValidationStateChange();

    this.state.pipe(filter(s => s.is(STATE_NAME.initial)))
      .subscribe(() => this._resetComponent())

    this.state.pipe(filter(s => s.is(STATE_NAME.focused)))
      .subscribe(() => this._setValidators(this._control, this._validators, this._asyncValidators));

    this.state.subscribe(state => {
      this._changeDetector.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this._tooltip.close();
  }

  public toggleFocus(event: FocusEvent): void {
    if (event.type === 'outsideclick' && (this._stateController.is(STATE_NAME.focused) || this._stateController.is(STATE_NAME.invalid))) {
      this._stateController.set(STATE_NAME.initial);
      this.value = this._initialValue;
    } else if (event.type === 'click' && this._stateController.is(STATE_NAME.initial)) {
      this._stateController.set(STATE_NAME.focused);
      this._initialValue = this.value;
    }  
  }

  public selectTextInInput(input: HTMLInputElement): void {
    input.focus();
    //input.setSelectionRange(input.value.length, input.value.length);
  }

  public submitData(value) {
    if (this.value === value || !this._stateController.is(STATE_NAME.focused)) return;
    this.onChange.next(value);
    this._stateController.next(STATE_NAME.submitted)
  }

  public setSuccessState(): void {
    this._stateController.next(STATE_NAME.success);
  }

  public setFailureState(): void {
    this._stateController.next(STATE_NAME.failure);
  }

  private _resetComponent(): void {
    this._inputRef.control.reset(this.value);
    this._inputRef.control.clearAsyncValidators();
    this._inputRef.control.clearValidators();
    this._inputRef.control.updateValueAndValidity();
    this._changeDetector.markForCheck();
  }

  private _setValidators(
    control: FormControl,
    validators: Validator | Validator[], 
    asyncValidators: AsyncValidator | AsyncValidator[]
  ): void {

        
    if (!!validators) {
      validators = Array.isArray(validators) ? validators : [ validators ]; 
      control.setValidators(validators.map(av => av.validate.bind(av)));
    }
          
    if (!!asyncValidators) {
      asyncValidators = Array.isArray(asyncValidators) ? asyncValidators : [ asyncValidators ];
      control.setAsyncValidators(asyncValidators.map(av => av.validate.bind(av)));
    }
    control.updateValueAndValidity();
  }


  private _listenForValidationStatus(control: FormControl): void {
    control.statusChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(status => {
        if (status === 'VALID' && this._stateController.is(STATE_NAME.invalid)) {
          this._stateController.next(STATE_NAME.focused);
        } else if (status === 'INVALID') {
          this._stateController.next(STATE_NAME.invalid);
        }
        this._changeDetector.markForCheck()
      });
  }

  private _toggleTooltipOnValidationStateChange(): void {
    this.state.subscribe(s => s.is(STATE_NAME.invalid) ? this._tooltip.open() : this._tooltip.close());
  }
}

