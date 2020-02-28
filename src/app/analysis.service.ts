import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  constructor(private httpClient: HttpClient) { }

  getAnalysis(lib: number, msg: Text) {
    this.httpClient.post(`${environment.apiurl}/analysis`,
      {
        lib: parseInt(`${lib}`),
        msg: `${msg}`,
      }).subscribe(
        data => { console.log(`POST succesfull`) },
        error => { console.log(`Error ${error}`); }
      );
  }
}
