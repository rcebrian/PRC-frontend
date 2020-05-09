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

}
