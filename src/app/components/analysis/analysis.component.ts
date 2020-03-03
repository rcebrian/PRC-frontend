import {Component, OnInit} from '@angular/core';

import {AnalysisService} from 'src/app/analysis.service';
import {HttpClient} from '@angular/common/http';

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
  // Use for send data to python
  msg: Text;
  lib: number;

  // Actual sentiment
  resultAnalysisData: Sentiment;

  // Use for sentiment text result
  msgSave: Text;
  messageExist: boolean;
  listResult: Array<string> = [];

  constructor(private analysisService: AnalysisService, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.lib = 0;
    this.messageExist = false;
  }

  getAnalysis() {
    if (this.messageExist) {
      const cinco = this.msgSave + '\nPolarity data: ' + this.resultAnalysisData.polarity
        + '\nSubjectivity data: ' + this.resultAnalysisData.subjectivity;
      this.listResult.push(cinco);
    }

    // Get result of the sentiment analysis
    this.analysisService.getAnalysis(this.lib, this.msg).subscribe(
      data => {
        this.resultAnalysisData = data as Sentiment;
      },
      error => {
        console.log(this.resultAnalysisData);
      }
    );

    this.msgSave = this.msg;
    this.messageExist = true;
  }
}
