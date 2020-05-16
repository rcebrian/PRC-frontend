import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {endpoints} from '../../../environments/endpoints';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {

  constructor(private http: HttpClient) { }

  getTopDestinations(): Observable<any> {
    return this.http.get(endpoints.getTopDestinations);
  }
}
