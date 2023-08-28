import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors, Validators } from '@angular/forms';
import { Observable, of, Subject, timer } from 'rxjs';
import { catchError, concatMap, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { AccountService } from 'src/app/core/identity/services/account/account.service';



@Injectable()
export class AccountValidators {

  constructor(
    private readonly _userService: AccountService,
  ) { }
  
  public emailUniqueness(control: AbstractControl, profileId?: string): Observable<ValidationErrors|null> {
    if (!control.value) return of(null);
    const propsToCheck = { email: control.value };
    if (profileId) {
      (propsToCheck as any).id = profileId;
    };

    return timer(1000).pipe(switchMap(() => this._checkAccountUniqueness(propsToCheck)));
  }


  private _checkAccountUniqueness(prop: { [key: string]: any }): Observable<ValidationErrors|null> {
    return this._userService.isAccountExists(prop as any)
      .pipe(map(isExists => isExists ?  { notUnique: true } : null ))
      .pipe(catchError(err => of({ connectionError: true })));
  }

}