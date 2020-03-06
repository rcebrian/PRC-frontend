import {Component, OnInit} from '@angular/core';

import {AnalysisService} from 'src/app/analysis.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DialogBodyComponent} from '../dialog-body/dialog-body.component';

export class Sentiment {
  polarity: number;
  subjectivity: number;
}

export class SentimentLog {
  lib: number;
  message: Text;
  polarity: number;
  subjectivity: number;
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
  connection: boolean;
  interval;


  // Actual sentiment
  resultAnalysisData: Sentiment;

  // Use for sentiment text result
  msgSave: Text;
  messageExist: boolean;
  listResult: Array<SentimentLog> = [];

  constructor(private analysisService: AnalysisService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.lib = 0;
    this.connection = true;
    this.messageExist = false;
    // @ts-ignore
    this.interval = setInterval(this.checkConnection.bind(this), 2000);
  }

  getAnalysis() {
    if (this.messageExist) {
      const sLog = {
        lib: this.lib,
        message: this.msgSave,
        polarity: this.resultAnalysisData.polarity,
        subjectivity: this.resultAnalysisData.subjectivity,
      } as SentimentLog;
      // Guarda los nuevos elementos al principio del array
      this.listResult.unshift(sLog);
    }

    // Get result of the sentiment analysis
    this.analysisService.getAnalysis(this.lib, this.msg).subscribe(
      data => {
        this.resultAnalysisData = data as Sentiment;
      },
      error => {
        alert(`An error occurred with the server connection`);
      }
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

  checkConnection() {
    this.analysisService.getTranslation(this.msg).subscribe(
      () => {
        this.connection = true;
        clearInterval(this.interval);
        this.interval = setInterval(this.checkConnection.bind(this), 300000);
      },
      error => {
        this.connection = false;
        clearInterval(this.interval);
        this.interval = setInterval(this.checkConnection.bind(this), 2000);
      }
    );
  }

  getError() {
    alert(`Enter a message please.`);
  }
}
