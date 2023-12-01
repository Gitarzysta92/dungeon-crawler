import { Directive, Input } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors, AsyncValidator } from '@angular/forms';
import { Observable } from 'rxjs';
import { AccountValidators } from '../../validators/account.validator';



type ProfileId = string;

@Directive({
  selector: '[uniqueEmailValidator]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UniqueEmailValidatorDirective, multi: true}]
})
export class UniqueEmailValidatorDirective implements AsyncValidator {

  @Input('uniqueEmailValidator') profileId: ProfileId;
  constructor(
    private readonly _accountValidators: AccountValidators,
  ) { }

  validate(control: AbstractControl): Observable<ValidationErrors|null> {
    return this._accountValidators.emailUniqueness(control, this.profileId);
  }

}
