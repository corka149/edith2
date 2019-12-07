import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authenticated = false;

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * login
   */
  public login(email: string, password: string): Observable<string> {
    return this.httpClient.post<string>('/jarvis/auth/signin', {email, password});
  }

  public getUserDetails(): Observable<User> {
    return this.httpClient.get<User>('/jarvis/v1/accounts/users/current')
      .pipe(
        tap(user => {
          this.authenticated = !!user && !!user.name;
        }),
        catchError(errors => this.handleError(errors))
      );
  }

  private handleError(errors: Array<any>): Observable<User> {
    this.authenticated = errors.length > 0;
    return of(null);
  }

  get isAuthenticated(): boolean {
    return this.authenticated;
  }
}
