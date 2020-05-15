import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endpoints } from '../../../environments/endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkersService {

  constructor(private http: HttpClient) { }

  getMarkers(): Observable<any> {
    return this.http.get(endpoints.coordinates);
  }
}
