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
  insertUserComment(title: string, original_message: string, date_time: string, grade: number, airport_id: string) {
    return this.httpClient.post(endpoints.insertUserComment, {
      title:  title,
      original_message: original_message,
      date_time: date_time,
      grade: grade,
      airport_id: airport_id
    });
    /*return this.httpClient.post(endpoints.createTrainModel,
      {
        algorithm_id: parseInt(`${algorithm_id}`),
        start_date: `${start_date}`,
        end_date: `${end_date}`,
        characteristic: characteristic,
      });*/
  }
}
