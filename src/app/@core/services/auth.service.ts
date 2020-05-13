import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {endpoints} from '../../../environments/endpoints'

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(endpoints.logIn, {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(endpoints.register, {
      name: user.name,
      surnames: user.surnames,
      dni: user.nif,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: 2, // client
      password: user.password,
      password_confirmation: user.password_confirmation,
    }, httpOptions);
  }
}

