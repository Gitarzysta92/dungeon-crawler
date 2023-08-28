import { OnInit, OnDestroy, Input, Component, Directive } from "@angular/core";
import { AbstractControl, Validators, FormControl, AsyncValidatorFn, ValidatorFn } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { IInputError } from "../../models/input-error";

import { ReactiveFormComponent } from "./reactive-form.component";


export interface ReactiveInputConfig {
  validators?: ValidatorFn[],
  asyncValidators?: AsyncValidatorFn[]
}

const defaultConfig: ReactiveInputConfig = {
  validators: [],
  asyncValidators: []
}

@Directive()
export class ReactiveInput implements OnInit, OnDestroy {

  public readonly control: AbstractControl;

  public visible: boolean = false;

  @Input() name: string;

  @Input() placeholder: string;

  @Input() type: string = "text";

  @Input() config: ReactiveInputConfig = defaultConfig;

  public isDisabled: boolean = false;
  @Input('disabled') set disabled(value) { 
    this.control.disable = value;
    this.isDisabled = value;
  };

  public isInactive: boolean = false;
  @Input('inactive') set inactive(value) { this.isInactive = !!value };

  public isRequired: boolean = false;
  @Input('required') set required(value) {
    this._addValidators([Validators.required]);
  };


  public get errors() { return Object.values(this._errors) };
  private _errors: { [key: string]: IInputError } = {};


  public get valid() { return this.control.valid };
  public get value() { return this.control.value };
  public get status() { return this.control.status };

  private _asyncValidators: AsyncValidatorFn[] = [];
  private _validators: ValidatorFn[] = [];

  private _destroyed: Subject<void> = new Subject();

  constructor(
    protected reactiveForm: ReactiveFormComponent
  ) {
    this.control = new FormControl();    
    this._listenForValidationErrors();
  } 

  ngOnInit(): void {
    this.reactiveForm.registerControl(this.name, this.control);  
    this._addAsyncValidators(this.config.asyncValidators || []);
    this._addValidators(this.config.validators || []);
  }

  ngOnDestroy(): void {
    this.reactiveForm.removeControl(this.name);
    this._destroyed.next();
  }

  
  private _addAsyncValidators(validators: AsyncValidatorFn[]): void {
    setTimeout(() => {
      this._asyncValidators = this._asyncValidators.concat(validators);
      this.control.setAsyncValidators(this._asyncValidators);
      this.control.updateValueAndValidity();
      this.control.setErrors({});
    },0);
  }

  private _addValidators(validators: ValidatorFn[]): void {
    setTimeout(() => {
      this._validators = this._validators.concat(validators);
      this.control.setValidators(this._validators);;
      this.control.updateValueAndValidity();
      this.control.setErrors({});
    },0);
  }

  private _listenForValidationErrors(): void {
    this.control.statusChanges
      .pipe(takeUntil(this._destroyed))
      .subscribe(value => {
        this._errors = {};
        if (value === "INVALID") {
          const errors = this.control.errors; 
          Object.keys(errors).forEach(key => {
            if (this._errors[key]) return;
            this._errors[key] = {
              name: key,
              value: errors[key]
            };
          });
        } else {
          this._errors = {};
        }
      });
  }
}