import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {  MAT_DIALOG_DATA } from '@angular/material/dialog';
import {AnalysisService} from 'src/app/analysis.service';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.scss']
})
export class DialogBodyComponent implements OnInit {
  message: JSON;

  constructor(public dialogRef: MatDialogRef<DialogBodyComponent>, @Inject(MAT_DIALOG_DATA) public data: Text,
              private analysisService: AnalysisService) {}

  ngOnInit(): void {
    this.analysisService.getTranslation(this.data).subscribe(
      data => {
        this.message = data as JSON;
      },
      error => {
        console.log(this.message);
      }
    );
  }

  close() {
    this.dialogRef.close(this.data + 'Thanks for using me!');
  }
}
