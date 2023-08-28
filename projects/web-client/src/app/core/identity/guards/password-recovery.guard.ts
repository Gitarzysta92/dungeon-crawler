import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { JwtParser } from 'src/app/utils/jwt-parser/jwt-parser.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordRecoveryGuard implements CanActivate {
  constructor(
    private readonly _jwtParser: JwtParser,
    private readonly _routerService: RoutingService
  ) { }

  canActivate(targetRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this._jwtParser.decode(targetRoute.params.token);
    if (token && token.exp > (Math.floor(Date.now()/1000))) return true;
    this._routerService.navigate(['session-expired']);    
    return false;
  }
}
