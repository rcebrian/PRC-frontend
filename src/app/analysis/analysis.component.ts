import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {

  msg: Text;
  lib: number;
  data: Text;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  analyse() {
        this.httpClient.post('http://127.0.0.1:5000/analysis',
      {
        'lib': 1,
        'msg': `${}`,
      }).subscribe(
        data => { console.log("POST Request is successful ", this.data); },
        error => { console.log("Error", error); }
      );
      alert(`The selected text is ${this.data}`);
  }

  // analyse2() {
  //   alert(`The selected text is ${this.msg}`);
  // }

}
