import { Component, Input } from "@angular/core";
import { fadeInMultipleElements } from "../../../animations/predefined-animations";
import { ReactiveFormComponent } from "../reactive-form/reactive-form.component";
import { ReactiveInputConfig, ReactiveInput } from "../reactive-form/reactive-input";


export interface TextInputConfig extends ReactiveInputConfig { }

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  animations: [
    fadeInMultipleElements('slideIn')
  ]
})
export class TextInputComponent extends ReactiveInput {

  public textHidden: boolean = false;
  @Input('text-hidden') set hidden(value) {
    this.type = 'password';
    this.textHidden = true;
  };

  constructor(
    private readonly _reactiveForm: ReactiveFormComponent
  ) {
    super(_reactiveForm);
  } 


  public toggleTextVisibility() {
    this.type = this.type === 'password' ? 'text' : 'password';
    this.textHidden = this.type === 'password';
  }
}
