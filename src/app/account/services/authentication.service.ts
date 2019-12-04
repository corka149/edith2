import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * login
   */
  public login(email: string, password: string): Promise<string> {
    return this.httpClient.post<string>('/jarvis/auth/signin', {email, password}).toPromise();
  }
}
