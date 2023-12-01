import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable()
export class CustomValidators {

  constructor() { }

  static email(control: AbstractControl): ValidationErrors|null {
    if (control.value === null || control.value === '') return null 
    return (control.value || '').match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gi) ? null : { notEmail: { content: control.value } }
  }
}