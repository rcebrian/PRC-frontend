import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {endpoints} from '../../../../environments/endpoints';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private httpClient: HttpClient) { } // service injection

  sendMail(name: string, email: string, message: string): Observable<any> {
    return this.httpClient.post(`${endpoints.contactMail}`, {
      name: `${name}`,
      email: `${email}`,
      message: `${message}`
    });
  }
}
