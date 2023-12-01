import { Inject, Injectable, Optional } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MAIN_INITIALIZE } from '../constants/main-initialization-token';
import { IMainInitializer } from '../models/main-initializer';

@Injectable({
  providedIn: 'root'
})
export class MainResolver implements Resolve<Observable<boolean>> {

  constructor(
    @Optional() @Inject(MAIN_INITIALIZE) private readonly _initializers: IMainInitializer[]
  ) { }

  resolve(): Observable<boolean> {
    this._initializers.forEach(i => i.initialize && i.initialize());
    return of(true);
  }
}