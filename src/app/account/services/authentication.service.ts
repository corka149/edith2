import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { catchError, tap, map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authenticated = false;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) { }

  /**
   * login
   */
  public login(email: string, password: string): Observable<boolean> {
    return this.httpClient.post<string>('/jarvis/auth/signin', {email, password})
      .pipe(
        catchError(error => of(false)),
        map(result => result !== false),
        tap(result => this.authenticated = result)
      );
  }

  /**
   * return if the logout was successful
   */
  public logout(): Observable<boolean> {
    return this.httpClient.get<string>('/jarvis/auth/signout')
      .pipe(
        map(resp => true),
        catchError(resp => of(false)),
        tap(resp => {
          console.log(`Was logout successful: ${resp}`);
          this.authenticated = resp;
        })
      );
  }

  public getUserDetails(): Observable<User> {
    return this.userService.getUser()
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
