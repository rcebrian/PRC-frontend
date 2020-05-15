import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endpoints } from '../../../environments/endpoints';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) { }

  dailyFlightsStats(): Observable<any> {
    return this.http.get(endpoints.dailyStats);
  }
}
