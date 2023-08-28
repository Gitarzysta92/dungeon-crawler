import { Component, OnInit } from '@angular/core';
import { ReactiveFormComponent } from '../reactive-form/reactive-form.component';
import { ReactiveInput } from '../reactive-form/reactive-input';


@Component({
  selector: 'checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.scss']
})
export class CheckboxInputComponent extends ReactiveInput {

  constructor(
    private readonly _reactiveForm: ReactiveFormComponent
  ) {
    super(_reactiveForm);
  } 

}
