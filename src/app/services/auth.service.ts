import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { config } from '../configs/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser: string;

  constructor(private http: HttpClient) { }

  async check() {
    console.log("Health check");
    let some = this.http.get<any>(config.apiUrl);
    console.log(config.apiUrl);
    some.subscribe((data: any) => { console.log(data) },
    )
  }

  login(user: { login: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/login`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.login, tokens.token)),
        mapTo(true),
        catchError(error => {
          console.log(`error ${error.error}`);
          return of(false);
        }));
  }

  logout() {
    this.doLogoutUser()
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, tokens: string) {
    this.loggedUser = username;
    this.storeJwtToken(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
  }
}