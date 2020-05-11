import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {endpoints} from "../../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
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

  // todo: complete register fields
  register(user): Observable<any> {
    return this.http.post(endpoints.register, {
      email: user.email,
      password: user.password
    }, httpOptions);
  }
}

