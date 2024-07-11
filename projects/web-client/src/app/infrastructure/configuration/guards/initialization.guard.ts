import { Inject, Injectable, Optional } from '@angular/core';
import { CanActivate } from '@angular/router';
import { IInitializable } from '../interfaces/initializable.interface';
import { INITIALIZATION_LOADING_SCREEN, INITIALIZE } from '../api';
import { LoadingScreenService } from 'src/app/shared/loaders/services/loading-screen.service';
import { BasicLoadingScreenComponent } from 'src/app/shared/misc/components/basic-loading-screen/basic-loading-screen.component';

@Injectable({
  providedIn: 'root'
})
export class InitializationGuard implements CanActivate {

  constructor(
    @Optional() @Inject(INITIALIZE) private readonly _initializables: IInitializable[],
    private readonly _loadingScreenService: LoadingScreenService
  ) {}

  async canActivate(): Promise<boolean> {
    this._loadingScreenService.showLoadingScreen(INITIALIZATION_LOADING_SCREEN, BasicLoadingScreenComponent)
    const initializables = this._initializables.filter(i => i.initialize);
    await Promise.all(initializables.map(i => i.initialize()));
    await new Promise(res => setTimeout(res, 1000));
    return true;
  }
  
}
