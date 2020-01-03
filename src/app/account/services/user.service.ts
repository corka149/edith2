import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserUpdate } from '../models/user';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static USER = '/jarvis/v1/accounts/users/current';

  constructor(
    private httpClient: HttpClient
  ) { }

  public getUser(): Observable<User> {
    return this.httpClient.get<User>(UserService.USER);
  }

  public updateUser(userUpdate: UserUpdate): Observable<User> {
    return this.httpClient.put<User>(UserService.USER, {user: userUpdate});
  }
}
