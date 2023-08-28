import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuth = this._authenticationService.isAuthenticated();

    if (!isAuth) {
      const path = next.data.onFailurePath;
      this._router.navigate([path]);
    };
    
    return isAuth;
  }
  
}
