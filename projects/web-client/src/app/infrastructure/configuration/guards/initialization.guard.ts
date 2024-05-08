import { Inject, Injectable, Optional } from '@angular/core';
import { CanActivate } from '@angular/router';
import { IInitializable } from '../interfaces/initializable.interface';
import { INITIALIZE } from '../api';

@Injectable({
  providedIn: 'root'
})
export class InitializationGuard implements CanActivate {

  constructor(
    @Optional() @Inject(INITIALIZE) private readonly _initializables: IInitializable[]
  ) {}

  async canActivate(): Promise<boolean> {
    const initializables = this._initializables.filter(i => i.initialize);
    await Promise.all(initializables.map(i => i.initialize()));
    await new Promise(res => setTimeout(res, 1000));
    return true;
  }
  
}
