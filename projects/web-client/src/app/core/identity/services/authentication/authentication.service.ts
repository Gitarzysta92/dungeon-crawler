import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { ConfigurationService } from 'src/app/infrastructure/configuration/api';
import { IAuthenticatedDto } from '../../models/authenticated.dto';
import { ICredentialsDto } from '../../models/credentials.dto';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public token: string;

  constructor(
    private readonly _config: ConfigurationService,
    private readonly _httpClient: HttpClient,
  ) { }


  public isAuthenticated(): boolean {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return !!this.token;
  }

  public authenticate(credentials: ICredentialsDto): Observable<string> {
    return this._httpClient.post<IAuthenticatedDto>(this._config.apiUrl + '/authentication/authenticate', credentials)
      .pipe(
        map(r => r["access_token"]),
        tap(t => {
          this.token = t;
          localStorage.setItem('token', t)
        })
      );
  }

  public unauthenticate() {
    this.token = null;
    localStorage.removeItem('token');
  }

  public refreshToken(): void {
    this._httpClient.get<IAuthenticatedDto>(this._config.apiUrl + 'authentication/refresh-token')
      .pipe(map(r => r["access_token"]))
      .subscribe({
        next: t => {
          this.token = t;
          localStorage.setItem('token', t)
        },
        error: () => {
          this.token = null;
          localStorage.removeItem('token');
        }
      });
  }
}
