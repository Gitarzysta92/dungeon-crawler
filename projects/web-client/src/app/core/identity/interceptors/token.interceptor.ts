import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { StoreService } from 'src/app/infrastructure/data-store/api';
import { SoundEffectsService } from 'src/app/aspects/sound-effects/api';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private readonly _authenticationService: AuthenticationService,
    private readonly _routingService: RoutingService,
    private readonly _storeService: StoreService,
    private readonly _soundEffectsService: SoundEffectsService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = this._authenticationService.token;
    if (userToken == null) return next.handle(req);
    const modifiedReq = req.clone({ 
      headers: req.headers.get('Authorization')?.toLocaleLowerCase() === 'skip' ? 
        req.headers.delete('Authorization') : req.headers.set('Authorization', `Bearer ${userToken}`),
    });

    return next.handle(modifiedReq)
      .pipe(catchError(err => {
        if ((err as HttpErrorResponse).status === 401) {
          this._authenticationService.unauthenticate();
          this._routingService.nagivateToLogin();
          this._storeService.closeStores();
          this._soundEffectsService.clearAll()
        } else {
          return throwError(err);
        }
      }))
  }
}
