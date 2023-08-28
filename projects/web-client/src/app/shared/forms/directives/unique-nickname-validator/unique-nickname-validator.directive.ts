import { Directive, Input } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProfileValidators } from '../../validators/unique-profile.validator';


type ProfileId = string;

@Directive({
  selector: '[uniqueNicknameValidator]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UniqueNicknameValidatorDirective, multi: true}]
})
export class UniqueNicknameValidatorDirective implements AsyncValidator {

  @Input('uniqueNicknameValidator') profileId: ProfileId;
  constructor(
    private readonly _profileValidators: ProfileValidators,
  ) { }

  validate(control: AbstractControl): Observable<ValidationErrors|null> {
    return this._profileValidators.nicknameUniquenessValidator(control, this.profileId);
  }

}
