import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {endpoints, environment} from "../../../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient) { }

  authenticate(email: string, password: string) {
    return this.http.post(`${endpoints.login}`,
      {
        email: parseInt(`${email}`),
        password: `${password}`,
      });
  }

  ngOnInit(): void {
  }

}
