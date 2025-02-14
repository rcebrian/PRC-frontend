import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {endpoints} from '../../../../environments/endpoints';
import {endOf} from 'ngx-bootstrap/chronos';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  getAlgorithms() {
    return this.httpClient.post(endpoints.getAlgorithm, {});
  }

  getModels() {
    return this.httpClient.post(endpoints.getModel, {});
  }

  getLastModels(model_id: number) {
    return this.httpClient.post(endpoints.lastModels, {
      model_id: parseInt(`${model_id}`),
    });
  }

  getModelInUse() {
    return this.httpClient.get(endpoints.getModelInUse, {});
  }

  setModelInUse(model: number) {
    return this.httpClient.post(endpoints.updateModel, {
      model: parseInt(`${model}`),
    });
  }

  createModel(characteristic:  Array<string>, start_date: String, end_date: String, algorithm_id: number) {
    return this.httpClient.post(endpoints.createTrainModel,
      {
        algorithm_id: parseInt(`${algorithm_id}`),
        start_date: `${start_date}`,
        end_date: `${end_date}`,
        characteristic: characteristic,
      });
  }

  predictFlights(start_date, end_date) {
    return this.httpClient.post(endpoints.predict,
      {
        start_date: `${start_date}`,
        end_date: `${end_date}`
      });
  }

  deleteModel(id: number) {
    return this.httpClient.post(endpoints.deleteModel,
      {
        model_id: `${id}`,
      });
  }

  updateHistoricalFlightsData(date: String, airport_id: string) {
    return this.httpClient.post(endpoints.flightsHistory,
      {
        airport_id: parseInt(`${airport_id}`),
        date: `${date}`,
      });
  }

  updateHistoricalWeatherData(date: String, airport_id: string) {
    return this.httpClient.post(endpoints.weatherHistory,
      {
        airport_id: parseInt(`${airport_id}`),
        date: `${date}`,
      });
  }

  updateFutureFlightsData(airport_id: string) {
    return this.httpClient.post(endpoints.flightsForecast,
      {
        airport_id: parseInt(`${airport_id}`),
      });
  }

  updateFutureWeatherData(airport_id: string) {
    return this.httpClient.post(endpoints.weatherForecast,
      {
        airport_id: parseInt(`${airport_id}`),
      });
  }

  updateUrlFlights(countryId: string) {
    return this.httpClient.post(endpoints.updateUrl,
      {
        country_id: parseInt(`${countryId}`),
      });
  }

  updateComments(cityId: string) {
    return this.httpClient.post(endpoints.updateComments,
      {
        city_id: parseInt(`${cityId}`),
      });
  }

  getFlightsGroupData(startDate: string, endDate: string): Observable<any> {
    return this.httpClient.post(endpoints.groupFlightsData,
      {
        start_date: startDate,
        end_date: endDate,
      });
  }

  getFlightsAirports(startDate: string, endDate: string): Observable<any> {
    return this.httpClient.post(endpoints.getAirportsFlights,
      {
        start_date: startDate,
        end_date: endDate,
      });
  }

  getCitiesComments() {
    return this.httpClient.get(endpoints.getCitiesComments, {});
  }

  getCitiesData(cityId: string) {
    return this.httpClient.post(endpoints.getDataComments, {
      city_id: cityId
    });
  }

  getAirports() {
    return this.httpClient.get(endpoints.getAirports, {});
  }

  getCities() {
    return this.httpClient.get(endpoints.getCities, {});
  }

  getCountries() {
    return this.httpClient.get(endpoints.getCountries, {});
  }
}
