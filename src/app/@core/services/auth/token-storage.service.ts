import { Injectable } from '@angular/core';

const TOKEN_KEY = 'access_token';
const TOKEN_TYPE = 'token_type';
const USER_KEY = 'user';
const TOKEN_TIME_OUT = 'time_out';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut() {
    window.sessionStorage.clear();

  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public tokenTimeOut(timeOut) {
    window.sessionStorage.removeItem(TOKEN_TIME_OUT);
    window.sessionStorage.setItem(TOKEN_TIME_OUT, JSON.stringify(timeOut) );
  }

  getTimeOut() {
    return JSON.parse(sessionStorage.getItem(TOKEN_TIME_OUT));
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  public getRole() {
    const user = this.getUser();
    return user.role;
  }

}
