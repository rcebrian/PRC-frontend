import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  getAlgorithms() {
    return this.httpClient.post(`${environment.apiUrl}/models/algorithms`,{});
  }

  getModels() {
    return this.httpClient.post(`${environment.apiUrl}/models/models`,{});
  }

  getLastModels(model_id:number) {
    return this.httpClient.post(`${environment.apiUrl}/models/lastModels`,{
      model_id: parseInt(`${model_id}`),
    });
  }

  setModelInUse(model:number){
    return this.httpClient.post(`${environment.apiUrl}/models/updateModel`,{
      model: parseInt(`${model}`),
    });
  }

  createModel(characteristic:  Array<string>, start_date: String, end_date: String, algorithm_id: number) {
    return this.httpClient.post(`${environment.apiUrl}/models/training`,
      {
        algorithm_id: parseInt(`${algorithm_id}`),
        start_date: `${start_date}`,
        end_date: `${end_date}`,
        characteristic: characteristic,
      });
  }

  updateHistoricalFlightsData(date: String, airport_id: number) {
    return this.httpClient.post(`${environment.apiUrl}/scrapers/flights/history`,
      {
        airport_id: parseInt(`${airport_id}`),
        date: `${date}`,
      });
  }

  updateHistoricalWeatherData(date: String, airport_id: number) {
    return this.httpClient.post(`${environment.apiUrl}/scrapers/weathers/history`,
      {
        airport_id: parseInt(`${airport_id}`),
        date: `${date}`,
      });
  }

  updateFutureFlightsData(airport_id: number) {
    return this.httpClient.post(`${environment.apiUrl}/scrapers/flights/forecast`,
      {
        airport_id: parseInt(`${airport_id}`),
      });
  }

  updateFutureWeatherData(airport_id: number) {
    return this.httpClient.post(`${environment.apiUrl}/scrapers/weathers/forecast`,
      {
        airport_id: parseInt(`${airport_id}`),
      });
  }

  updateUrlFlights(countryId: number){
    return this.httpClient.post(`${environment.apiUrl}/scrapers/airportia/url`,
      {
        country_id: parseInt(`${countryId}`),
      });
  }


}
