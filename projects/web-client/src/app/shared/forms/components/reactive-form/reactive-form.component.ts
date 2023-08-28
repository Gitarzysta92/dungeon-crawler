import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';


export interface ReactiveFormInput {

}


@Component({
  selector: 'reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactiveFormComponent implements OnInit {

  @ContentChildren('input') _inputs: ReactiveFormInput[]

  @Input() form: FormGroup;

  @Output() onSubmit: EventEmitter<FormGroup> = new EventEmitter();

  public get valid() { return this.form?.valid }

  

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _changeDetector: ChangeDetectorRef
  ) {
    this.form = this._formBuilder.group({});
  }

  ngOnInit(): void {}

  public registerControl(name: string, control: AbstractControl): void {
    this.form.addControl(name, control);
  }

  public removeControl(name: string): void {
    this.form.removeControl(name);
  }

  public submitForm(): void {
    const controls = this.form.controls;
    Object.keys(controls).forEach(key => {
      if (controls[key].status !== 'VALID') {
        controls[key].updateValueAndValidity();
      }    
    });
    this.onSubmit.next(this.form);
    this._changeDetector.markForCheck();
  }

}



