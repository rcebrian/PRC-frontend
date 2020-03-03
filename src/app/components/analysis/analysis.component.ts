import { Component, OnInit } from '@angular/core';

import { AnalysisService } from 'src/app/analysis.service';
import { HttpClient } from '@angular/common/http';

export class Sentiment {
  polarity: Text;
  subjectivity: Text;
}

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})

export class AnalysisComponent implements OnInit {

  msg: Text;
  lib: number;
  data: Text;

  resultAnalysisData: Sentiment;
  polarity: Text;

  constructor(private analysisService: AnalysisService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.lib = 0;
  }

  getAnalysis() {
    this.analysisService.getAnalysis(this.lib, this.msg).subscribe(
      data => {this.resultAnalysisData = data as Sentiment;},
      error => {console.log(this.resultAnalysisData); }
    );
  }
}
