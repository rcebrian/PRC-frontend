import {Component, OnInit} from '@angular/core';

import {AnalysisService} from 'src/app/services/analysis.service';
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

  buttonDisabled: boolean;
  warningEmptyMsg: string;

  // Actual sentiment
  resultAnalysisData: Sentiment;

  // Use for sentiment text result
  msgSave: Text;
  messageExist: boolean;
  listResult: Array<SentimentLog> = [];

  constructor(private analysisService: AnalysisService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.lib = 1;
    this.connection = true;
    this.messageExist = false;
    this.buttonDisabled = false;
    // @ts-ignore
    this.interval = setInterval(this.checkConnection.bind(this), 2000);
  }

  getAnalysis() {
    this.buttonDisabled = true;
    if (this.messageExist && this.resultAnalysisData != null) {
      const sLog = {
        lib: this.lib,
        message: this.msgSave,
        polarity: this.resultAnalysisData.polarity,
        subjectivity: this.resultAnalysisData.subjectivity,
      } as SentimentLog;
      // Guarda los nuevos elementos al principio del array
      this.listResult.unshift(sLog);
      this.resultAnalysisData = null;
    }

    if (this.msg != null && this.msg.toString() !== '') {
      this.warningEmptyMsg = null;
      // Get result of the sentiment analysis
      this.analysisService.getAnalysis(this.lib, this.msg).subscribe(
        data => {
          this.resultAnalysisData = data as Sentiment;
          this.buttonDisabled = false;
        },
        error => {
          alert(`An error occurred with the server connection`);
          this.buttonDisabled = false;
        }
      );
      this.msgSave = this.msg;
      this.messageExist = true;
    } else {
      this.warningEmptyMsg = 'Enter a message';
      this.buttonDisabled = false;
    }
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

  generateIcon(polarity: number) {
    if (polarity >= -1 && polarity < -0.5) {
      return -1;
    } else if (polarity >= -0.5 && polarity <= 0.5) {
      return 0;
    } else if (polarity > 0.5 && polarity <= 1) {
      return 1;
    } else {
      return 2;
    }
  }
}
