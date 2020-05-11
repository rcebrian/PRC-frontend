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
}
