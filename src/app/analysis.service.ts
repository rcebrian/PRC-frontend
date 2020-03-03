import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  constructor(private httpClient: HttpClient) { }

  getAnalysis(lib: number, msg: Text) {
    return this.httpClient.post(`${environment.apiurl}/analysis`,
      {
        lib: parseInt(`${lib}`),
        msg: `${msg}`,
      });

    /* Con promesas
    const data = this.httpClient.post(`${environment.apiurl}/analysis`,
      {
        lib: parseInt(`${lib}`),
        msg: `${msg}`,
      }).toPromise();

    // @ts-ignore
    this.resultAnalysisData = data;
    return this.resultAnalysisData;*/
  }
}
