import {Component, OnInit, Inject} from '@angular/core';

import {AnalysisService} from 'src/app/analysis.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {DialogBodyComponent} from '../dialog-body/dialog-body.component';

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

  constructor(private analysisService: AnalysisService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.lib = 0;
    this.messageExist = false;
  }

  getAnalysis() {
    if (this.messageExist) {
      const result = this.msgSave + '\nPolarity data: ' + this.resultAnalysisData.polarity
        + '\nSubjectivity data: ' + this.resultAnalysisData.subjectivity;

      // Guarda los nuevos elementos al principio del array
      this.listResult.unshift(result);
    }

    // Get result of the sentiment analysis
    this.analysisService.getAnalysis(this.lib, this.msg).subscribe(
      data => {
        this.resultAnalysisData = data as Sentiment;
      },
      error => { console.log(this.resultAnalysisData); }
    );

    this.msgSave = this.msg;
    this.messageExist = true;
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.msg;
    dialogConfig.maxWidth = '60%';
    this.dialog.open(DialogBodyComponent, dialogConfig);

  }
}
