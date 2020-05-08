import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  constructor(private httpClient: HttpClient) { }

  getAnalysis(lib: number, msg: Text) {
    return this.httpClient.post(`${environment.apiUrl}/analysis`,
      {
        lib: parseInt(`${lib}`),
        msg: `${msg}`,
      });
  }

  getTranslation(msg: Text) {
    return this.httpClient.post(`${environment.apiUrl}/translate`,
      {
        lang: 'en',
        msg: `${msg}`,
      });
  }

  getAlgorithms() {
    return this.httpClient.post(`${environment.apiUrl}/models/algorithms`,{});
  }

  getModels() {
    return this.httpClient.post(`${environment.apiUrl}/models/models`,{});
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
