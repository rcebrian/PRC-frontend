import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {endpoints} from '../../../../environments/endpoints';

@Injectable({
  providedIn: 'root'
})
export class AirportDescriptionService {

  constructor(private httpClient: HttpClient) { }
  getFlights(id: string) {
    return this.httpClient.get(`${endpoints.getFlights}/${id}`, {});
  }
  getComments(id: string) {
    return this.httpClient.get(`${endpoints.getComments}/${id}`, {});
  }
}
